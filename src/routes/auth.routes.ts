
import { CommonRoutesConfig } from "../../common/routes/config";
import { Application, NextFunction, Request, Response, Router } from 'express';
import authMiddleware from "../auth/auth.middleware";

export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): Router {
        const router = Router();

            router.post('/auth', [
                authMiddleware.validateRequestBody,
                authMiddleware.validateCredentials,
                authMiddleware.generateJWT,
            ]);

            // router.post('/auth/refresh-token', [
            //     authMiddleware.validateJWT,
            //     authMiddleware.validateRefreshNeeded,
            //     authMiddleware.generateJWT,
            // ]);

        return router;
    }
}
