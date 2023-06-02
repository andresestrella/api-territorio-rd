import express from 'express';
import { pool as db } from '../../common/database/database'
import crypto from 'crypto';
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;

class AuthMiddleware {
    async validateRequestBody(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.username && req.body.password) {
            next();
        } else {
            res.status(400).send({
                errors: ['Missing fields: username and password'],
            });
        }
    }

    async validateCredentials(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user: QueryResult = await db.query('SELECT * FROM users WHERE username = $1', [req.body.username]);

            if (user.rowCount > 0) {
                let passwordFields = user.rows[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt)
                    .update(req.body.password)
                    .digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user.rows[0].id,
                        username: user.rows[0].username,
                    };
                    return next();
                } else {
                    console.log('was it here?')
                    return res.status(400).send({ message: ['Invalid username and/or password'], });
                }

            } else {
                console.log('or here?')
                return res.status(400).send({ message: ['Invalid username and/or password'] });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }


    async generateJWT(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return res.status(201).send({ accessToken: token, refreshToken: hash });
        } catch (err) {
            console.log('createJWT error: %O', err);
            return res.status(500).send();
        }
    }

    async validateJWT(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (authorizationHeader) {
                const token = authorizationHeader.split(' ')[1];
                const decoded = jwt.verify(token, jwtSecret) as any;
                req.body.userId = decoded.userId;
                return next();
            } else {
                return res.status(401).send({ message: 'Unauthorized' });
            }
        } catch (err) {
            console.log('validateJWT error: %O', err);
            return res.status(401).send({ message: 'Unauthorized' });
        }
    }
}

export default new AuthMiddleware();
