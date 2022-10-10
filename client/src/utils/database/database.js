import { gluesql } from "gluesql";
import { DDLQueries } from "./schema";

async function initializeDb() {
    console.log("getExpDb called");
    const glue = await gluesql();

    // debug purpose code
    window.glue = glue;

    console.debug(DDLQueries);

    await glue.query(DDLQueries);

    // insert test purpose data
    await glue.query(
        middlewareForDebugQuery(
            `INSERT INTO users VALUES ("naive-id-1", "Good", 0);`
        )
    );
    await glue.query(
        middlewareForDebugQuery(
            `INSERT INTO users VALUES ("naive-id-2", "naive-name-2", 2);`
        )
    );
    await glue.query(
        middlewareForDebugQuery(
            `INSERT INTO users VALUES ("naive-id-3", "naive-long-long-long-name-3", 5);`
        )
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO files VALUES (
            "naive-file-id-1", "naive-file-name-1", 128, "PNG", 1, false, 
            "naive-id-3", "2022-10-01T14:48:00.000Z");`)
    );
    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO files VALUES (
            "naive-file-id-2", "naive-file-name-2", 256123, "JPEG", 0, true, 
            "naive-id-2", "2022-10-01T15:48:00.000Z");`)
    );
    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO files VALUES (
            "naive-file-id-3", "naive-file-name-3", 256123, "HWP", 0, true, 
            "naive-id-2", "2022-10-05T15:48:00.000Z");`)
    );
    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO files VALUES (
            "naive-file-id-4", "naive-file-name-2", 256123, "JPEG", 0, true, 
            "naive-id-2", "2022-10-02T15:48:00.000Z");`)
    );
    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO files VALUES (
            "naive-file-id-5", "naive-file-name-5", 256123, "JPEG", 0, true, 
            "naive-id-2", "2022-09-01T15:48:00.000Z");`)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO links VALUES (
            "naive-link-id-1", "naive-link-name-4", 0, false, 
            "naive-uploader", "2022-10-02T15:48:00.000Z");`)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO links VALUES (
            "naive-link-id-2", "naive-link-name-2", 0, false, 
            "naive-uploader", "2022-10-02T16:48:00.000Z");`)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO comments VALUES (
            "naive-comment-id-2", "naive-file-id-1", "FILE", "i want to download but i
            can’tdaklfdjaslkdjfalkdsnfaldlafksldkfjalsdkjfaljdflksa", 
            "naive-sender", "naive-id-3", "2022-10-02T16:48:00.000Z");`)
    );
    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO comments VALUES (
            "naive-comment-id-3", "naive-file-id-1", "FILE", "hoho", 
            "naive-sender", "naive-id-3", "2022-10-02T17:48:00.000Z");`)
    );
    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO comments VALUES (
            "naive-comment-id-4", "naive-file-id-1", "FILE", "hoho", 
            "naive-sender", "naive-uploader", "2022-10-02T12:28:00.000Z");`)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO comments VALUES (
            "naive-comment-id-5", "naive-file-id-2", "FILE", "hoho", 
            "naive-sender", "naive-id-2", "2022-10-02T16:48:00.000Z");`)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO comments VALUES (
            "naive-comment-id-6", "naive-file-id-2", "FILE", "i want to download but i
            can’tdaklfdjaslkdjfalkdsnfaldlafksldkfjalsdkjfaljdflksa", 
            "naive-sender", "naive-id-2", "2022-10-02T08:21:00.000Z");`)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO comment_metadata VALUES (
            "naive-file-id-2", "naive-comment-id-5"
        );
    `)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO notifications VALUES (
            "naive-noti-id-1", "COMMENT", "notification came hohoho", "naive-file-id-2",
            "FILE", "naive-id-2", "2022-10-02T08:21:00.000Z"
        );
    `)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO notifications VALUES (
            "naive-noti-id-2", "COMMENT", "another notification came hohoho", "naive-file-id-1",
            "FILE", "naive-id-2", "2022-10-02T08:17:00.000Z"
        );
    `)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO notifications VALUES (
            "naive-noti-id-3", "STATUS", "peer downloaded!", "naive-link-id-1",
            "FILE", "naive-id-1", "2022-10-02T12:17:00.000Z"
        );
    `)
    );

    let q = `SELECT
    f.*, COUNT(*)
  FROM links f
  LEFT JOIN comments c ON f.id = c.data_id
  GROUP BY f.id`;

    const resp = await glue.query(q);
    console.table(resp?.[0]?.rows);
    console.log("==================");

    q = `SELECT
    f.*, COUNT(*)
  FROM files f
  LEFT JOIN comments c ON f.id = c.data_id
  GROUP BY f.id`;

    const resp2 = await glue.query(q);
    console.table(resp2?.[0]?.rows);
    console.log("==================");

    let a = "";

    for (const s of sqls) {
        a += `${s}\n`;
    }
    console.debug(a);

    return glue;
}

let glue = initializeDb();

const sqls = [];

function middlewareForDebugQuery(sql) {
    sqls.push(sql);
    return sql;
}

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

init();

export { run };
