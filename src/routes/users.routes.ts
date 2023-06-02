import { CommonRoutesConfig } from "../../common/routes/config";
import { Application, Router } from 'express';
import { insert, getById } from '../controllers/users.controller';
import authMiddleware from "../auth/auth.middleware";

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): Router {
        const router = Router();
        router.route('/users')
            .post(insert);
        // .get(getAllUsers)

        router.route('/users/:userId')
            .all(authMiddleware.validateJWT)
            .get(getById);

        return router;
    }
}
