import { gluesql } from 'gluesql';

let db = null;

async function init() {
    const glue = await gluesql();
    console.log("glue initialize done");

    db = glue;

    db.query(`
  CREATE TABLE User (id INTEGER, name TEXT);
  INSERT INTO User VALUES (1, "Hello"), (2, "World");
`);

    const [{ rows }] = await db.query('SELECT * FROM User;');

    console.log(rows);
}

init();




