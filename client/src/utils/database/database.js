import { gluesql } from "gluesql";
import { insertMockData } from "./mockData";
import { DDLQueries } from "./schema";

async function initializeDb() {
    console.log("getExpDb called");
    const glue = await gluesql();

    console.debug(DDLQueries);

    await glue.query(DDLQueries);

    if (process.env.NODE_ENV !== "production") {
        await insertMockData(glue);
    }

    return glue;
}

let glue = initializeDb();

async function init() {
    console.log("init called?");
    await glue;
}

async function run(sql) {
    // console.debug(sql);
    const db = await glue;
    const result = await db.query(sql);
    return result;
}

async function debug(sql) {
    const db = await glue;
    const result = await db.query(sql);
    console.log(result);
}

// debug purpose code
window.glue = debug;

init();

export { run, init as initGlueSQL };
