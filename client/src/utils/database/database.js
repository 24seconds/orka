import { gluesql } from "gluesql";
import { DDLQueries } from "./schema";

async function initializeDb() {
    console.log("getExpDb called");
    const glue = await gluesql();

    await glue.query(DDLQueries);
    await glue.query(`INSERT INTO users VALUES ("naive-id-1", "naive-name-1", 1);`);
    await glue.query(`INSERT INTO users VALUES ("naive-id-2", "naive-name-2", 2);`);

    return glue;
}

let glue = initializeDb();


async function init() {
    console.log("init called?");
    await glue;
}

async function run(sql) {
    const db = await glue;
    const result = await db.query(sql);
    return result;
}

init();

export { run };
