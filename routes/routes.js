import { Router } from "express";
import Query from "../class/Query.js";

const myRouter = Router();

myRouter.get("/", (req,res) => {
    res.render("index");
});

myRouter.post("/validar", async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let account = new Query(email, password);

    if(await account.verifyUser()){
        console.log("Ingreso exitoso");
        res.render("output", {mensaje: "ingreso exitoso"});
    }else{
        console.log("ingreso fallido");
        res.render("output", {mensaje: "ingreso fallido"})
    }    
});

myRouter.post("/crear", async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let account = new Query(email, password);

    let result = await account.createUser();
    if (result){
        res.render("output", {mensaje:"Creacion exitosa"})
    }else{
        res.render("output", {mensaje: "Usuario ya existe"})
    }
})

myRouter.get("/usuarios", async (req,res) => {
    let accounts = new Query('','');
    
    let result = await accounts.getAllUsers();

    res.render("usuarios", {tabla: result.rows})
})

export default myRouter;