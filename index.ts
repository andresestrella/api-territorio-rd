import express, { Request, Response } from 'express';
import * as http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
// import { CommonRoutesConfig } from './common/routes/config';
import { TerritoryRoutes } from './src/routes/territory.routes';
import winston from 'winston';
import * as expressWinston from 'express-winston';
import { UserRoutes } from './src/routes/users.routes';
import { AuthRoutes } from './src/routes/auth.routes';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;

// middleware to parse all incoming requests as JSON
app.use(express.json());

// middleware to allow cross-origin requests
app.use(cors());

// configure expressWinston logger, which will log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all:true})
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debuggin, log requests as one-liners
}

// initialize logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// add UserRoutes to routes array after sending the app object to have the routes added to it.
// routes.push(new TerritoryRoutes(app));
app.use('/api', new TerritoryRoutes(app).router);
app.use('/api', new UserRoutes(app).router);
app.use('/api', new AuthRoutes(app).router);

// simple route to test the server
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(runningMessage);
})

server.listen(port, () => {
    console.log(runningMessage);
})
