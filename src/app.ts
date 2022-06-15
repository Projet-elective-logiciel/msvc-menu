import * as express from "express";
import * as bodyParser from "body-parser";
import MenusController from "menus/menus.controller";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: MenusController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/api/", controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Menu API listening on the port ${this.port}`);
        });
    }
}

export default App;
