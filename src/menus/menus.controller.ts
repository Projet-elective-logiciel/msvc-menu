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
        const idRestaurant = req.body._id;
        if (!idRestaurant) {
            menuModel.find().then((menus) => {
                res.status(200).json(menus);
            });
        }
        else {
            menuModel.find({_id: idRestaurant}).then((menus) => {
                res.status(200).json(menus);
            });
        }
    }

    private createMenu(req: express.Request, res: express.Response) {
        const menuData: Menus = req.body;
        const idRestaurant = req.body._id;

        menuModel
            .findOne({ _id: idRestaurant})
            .then((user) => {
                if (user) {
                    console.log(`Menu with this name : ${name} already exists`);
                    res.status(400).send(`Menu with this name : ${name} already exists`);
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
        const _id = req.body._id;
        const name = menuData.name;

        menuModel
            .findOneAndUpdate({ _id: _id}, {$set:req.body}, { new: true })
            .then((user) => {
                console.log(`Updated menu restaurant: ${user.name}`);
                res.status(200).send(`Updated menu restaurant: ${user.name}`);
            }).catch((err) => {
                console.log(`Update failed ${err}`);
                res.status(400).send(`Update failed ${err}`);
            })
    }

    private deleteMenu(req: express.Request, res: express.Response) {
        const idRestaurant = req.body._id;
        
        menuModel
            .findOneAndDelete({ _id: idRestaurant})
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
