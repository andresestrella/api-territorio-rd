import { CommonRoutesConfig } from "../../common/routes/config";
import { Router, Application } from "express";
import * as territoryController from '../controllers/territory.controller'
import authMiddleware from "../auth/auth.middleware";

export class TerritoryRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "TerritoryRoutes");
    }

    configureRoutes(): Router {
        const router = Router();
        router.route("/paises")
            .get(territoryController.getAllPaises);

        router.route("/paises/:paisId/show")
            .get(territoryController.getPaisById);

        router.route("/provincias").all(authMiddleware.validateJWT)
            .get(territoryController.getAllProvincias);

        router.route("/provincias/:provinciaId/show").all(authMiddleware.validateJWT)
            .get(territoryController.getProvinciaById);

        router.route("/municipios").all(authMiddleware.validateJWT)
            .get(territoryController.getAllMunicipios);

        router.route("/municipios/:municipioId/show").all(authMiddleware.validateJWT)
            .get(territoryController.getMunicipioById);

        router.route("/distritos").all(authMiddleware.validateJWT)
            .get(territoryController.getAllDistritos);

        router.route("/distritos/:distritoId/show").all(authMiddleware.validateJWT)
            .get(territoryController.getDistritoById);

        return router;
    }
}
