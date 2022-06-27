import * as express from "express";
import Menus from "./menus.interface";
import menuModel from "./menus.model";

class MenusController {
    public path = "/menu";
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getMenus);
        this.router.get(`${this.path}/:_id`, this.getMenu);
        this.router.post(this.path, this.createMenu);
        this.router.put(`${this.path}/:_id`, this.updateMenu);
        this.router.delete(`${this.path}/:_id`, this.deleteMenu);
    }

    private getMenus(req: express.Request, res: express.Response) {
        menuModel.find().then((menus) => {
            res.status(200).json(menus);
        }).catch((err) => {
            res.status(500).send(err);
        });
    }

    private getMenu(req: express.Request, res: express.Response) {
        const idRestaurant = req.params._id;
        if (!idRestaurant) {
            menuModel.find().then((menus) => {
                res.status(200).json(menus);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            menuModel.find({ _id: idRestaurant }).then((menus) => {
                res.status(200).json(menus);
            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }

    private createMenu(req: express.Request, res: express.Response) {
        const menuData: Menus = req.body;

        const createdMenu = new menuModel(menuData);
        createdMenu.save().then((savedRestaurant) => {
            res.send(savedRestaurant);
        }).catch((err) => {
            res.status(500).send(err);
        });
    }

    private updateMenu(req: express.Request, res: express.Response) {
        const id = req.params._id;

        menuModel
            .findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
            .then((user) => {
                console.log(`Updated menu restaurant: ${user.name}`);
                res.status(200).send(`Updated menu restaurant: ${user.name}`);
            })
            .catch((err) => {
                console.log(`Update failed ${err}`);
                res.status(400).send(`Update failed ${err}`);
            });
    }

    private deleteMenu(req: express.Request, res: express.Response) {
        const idRestaurant = req.params._id;

        menuModel
            .findOneAndDelete({ _id: idRestaurant })
            .then((user) => {
                console.log(`Deleted menu restaurant: ${user.name}`);
                res.status(200).send(`Deleted menu restaurant: ${user.name}`);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send(err);
            });
    }
}

export default MenusController;
