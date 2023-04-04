import client from "../utils/conf.js";

export default class Query{
    constructor(userform, passwordform){
        this.user = userform;
        this.password = passwordform;
    };

    async createUser(){
        let result =await searchUser(this.user);
        console.log(result);
        if (result){
            let insert = await insertUser(this.user, this.password);
            console.log(insert);
            if (insert){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    };

    async verifyUser(){
        let result = await searchUser(this.user);
        if (this.password == result.rows[0].password){
            return true;
        }else{
            return false;
        }
    }

    async getAllUsers(){
        let result = await searchAllUsers();
        console.log(result);
        return result;
    }
};

async function searchUser(userform){
    const query = {
        name: "fetch-user",
        text: "SELECT * FROM usuarios WHERE email= $1;",
        values: [userform]
    };

    try {
        let res = await client.query(query);
        client.release;
        return res;
    } catch (error) {
        client.release;
        console.log(error);
        return false;
    }

    
}

async function insertUser(userform, passwordform){
    const query = {
        name: "insert-user",
        text: "INSERT INTO usuarios VALUES ($1,$2);",
        values: [userform, passwordform]
    }

    try {
        let res = await client.query(query);
        console.log("Ingreso exitoso");
        client.relelase;
        return res;
    } catch (error) {
        client.release;
        console.log(error);
        return false;
    }

}

async function searchAllUsers(){
    const query = {
        name: "fetch-all-Users",
        text: "SELECT * FROM usuarios;",
        values: []
    };

    try {
        let res = await client.query(query);
        console.log("Lectura exitosa");
        return res;
    } catch (error) {
        console.log(error);
        return false;
    };


}