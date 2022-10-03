import { gluesql } from "gluesql";
import { DDLQueries } from "./schema";

async function initializeDb() {
    console.log("getExpDb called");
    const glue = await gluesql();

    await glue.query(DDLQueries);

    // insert test purpose data
    await glue.query(
        `INSERT INTO users VALUES ("naive-id-1", "naive-name-1", 1);`
    );
    await glue.query(
        `INSERT INTO users VALUES ("naive-id-2", "naive-name-2", 2);`
    );

    await glue.query(`
        INSERT INTO files VALUES (
            "naive-file-id-1", "naive-file-name-1", 128, "PNG", 1, false, 
            "naive-uploader", "2022-10-01T14:48:00.000Z");`);
    await glue.query(`
            INSERT INTO files VALUES (
                "naive-file-id-2", "naive-file-name-2", 256123, "JPEG", 0, true, 
                "naive-uploader", "2022-10-01T15:48:00.000Z");`);

    await glue.query(`
            INSERT INTO links VALUES (
                "naive-link-id-1", "naive-link-name-1", 0, false, 
                "naive-uploader", "2022-10-02T15:48:00.000Z");`);

    await glue.query(`
            INSERT INTO links VALUES (
                "naive-link-id-2", "naive-link-name-2", 0, false, 
                "naive-uploader", "2022-10-02T16:48:00.000Z");`);

    await glue.query(`
        INSERT INTO comments VALUES (
            "naive-comment-id-2", "naive-file-name-1", "FILE", "hoho", 
            "naive-sender", "naive-uploader", "2022-10-02T16:48:00.000Z");`);

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
