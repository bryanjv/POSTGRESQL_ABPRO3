import pg from "pg";

const {Pool} = pg;
const client = new Pool({
    host: "localhost",
    database: "softlife",
    user: "postgres",
    password: "1234"
});

export default client;