import * as mongoose from "mongoose";
import Menu from "./menus.interface";

const menuSchema = new mongoose.Schema({
    name: String,
    description: String,
    articles: [],
    price: Number,
	image: String
});

const menuModel = mongoose.model<Menu & mongoose.Document>(
    "Menu",
    menuSchema
);

export default menuModel;