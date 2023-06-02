import express from "express";

export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;
    router: express.Router;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.router = this.configureRoutes();
    }

    getName() {
        return this.name;
    }

    abstract configureRoutes(): express.Router;
}
