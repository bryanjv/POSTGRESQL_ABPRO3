import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import hbs from "hbs";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine","hbs");
hbs.registerPartials(join(dirname(fileURLToPath(import.meta.url)), "./views/partials"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(join(__dirname,"./public")));

app.listen(3000, () => {
    console.log("Server ON");
})


