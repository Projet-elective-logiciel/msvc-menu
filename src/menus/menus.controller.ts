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
        this.router.get(this.path, this.getMenu);
        this.router.post(this.path, this.createMenu);
        this.router.put(this.path, this.updateMenu);
        this.router.delete(this.path, this.deleteMenu);
    }

    private getMenu(req: express.Request, res: express.Response) {
        const idRestaurant = req.body.idRestaurant;
        if (!idRestaurant) {
            menuModel.find().then((menus) => {
                res.status(200).json(menus);
            });
        }
        else {
            menuModel.find({idRestaurant: idRestaurant}).then((menus) => {
                res.status(200).json(menus);
            });
        }
    }

    private createMenu(req: express.Request, res: express.Response) {
        const menuData: Menus = req.body;
        const idRestaurant = menuData.idRestaurant;

        menuModel
            .findOne({ idRestaurant: idRestaurant})
            .then((user) => {
                if (user) {
                    console.log(`Menu with email ${idRestaurant} already exists`);
                    res.status(400).send(`Menu with email ${idRestaurant} already exists`);
                } else {
                    console.log(menuData);
                    const createdMenu = new menuModel(menuData);
                    createdMenu.save().then((savedRestaurant) => {
                        res.send(savedRestaurant);
                    });
        }})
    }


    private updateMenu(req: express.Request, res: express.Response) {
        const menuData: Menus = req.body;
        const idRestaurant = menuData.idRestaurant;
        const name = menuData.name;

        menuModel
            .findOneAndUpdate({ idRestaurant: idRestaurant, name: name}, menuData)
            .then((user) => {
                console.log(`Updated menu restaurant: ${user.name}`);
                res.status(200).send(`Updated menu restaurant: ${user.name}`);
            }).catch((err) => {
                console.log(`Update failed ${err}`);
                res.status(400).send(`Update failed ${err}`);
            })
    }

    private deleteMenu(req: express.Request, res: express.Response) {
        const idRestaurant = req.body.idRestaurant;
        
        menuModel
            .findOneAndDelete({ idRestaurant: idRestaurant})
            .then((user) => {
                console.log(`Deleted menu restaurant: ${user.name}`);
                res.status(200).send(`Deleted menu restaurant: ${user.name}`);
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err);
            })
    }
}

export default MenusController;
