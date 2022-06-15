import "dotenv/config";
import App from "./app";
import * as mongoose from "mongoose";
import validateEnv from "./utils/validateEnv";
import MenusController from "./menus/menus.controller";

validateEnv();
const { MONGO_PATH, MONGO_DB, MONGO_URI } = process.env;

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main().catch((err) => console.log(err));
main().then(() => {
    console.log(`Connection successful to ${MONGO_PATH}`);
});

const app = new App([new MenusController()], Number(process.env.PORT));

app.listen();
