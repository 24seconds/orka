async function insertMockData(glue) {
    // insert test purpose data
    await glue.query(
        middlewareForDebugQuery(
            `INSERT INTO users VALUES ('naive-id-1', 'Good', 0);`
        )
    );
    await glue.query(
        middlewareForDebugQuery(
            `INSERT INTO users VALUES ('naive-id-2', 'naive-name-2', 2);`
        )
    );
    await glue.query(
        middlewareForDebugQuery(
            `INSERT INTO users VALUES ('naive-id-3', 'naive-long-long-long-name-3-hohohohohohohohohohoho', 5);`
        )
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO notifications VALUES (
            'naive-noti-id-1', 'COMMENT', 'notification came hohoho', 'naive-file-id-2',
            'naive-id-2', '2022-10-02T08:21:00.000Z'
        );
    `)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO notifications VALUES (
            'naive-noti-id-2', 'COMMENT', 'another notification came hohoho', 'naive-file-id-1',
            'naive-id-2', '2022-10-02T08:17:00.000Z'
        );
    `)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO notifications VALUES (
            'naive-noti-id-3', 'STATUS', 'peer downloaded!', 'naive-file-id-1',
            'naive-id-1', '2022-11-02T12:17:00.000Z'
        );
    `)
    );

    await glue.query(
        middlewareForDebugQuery(`
        INSERT INTO sharing_data VALUES ('naive-file-id-1', 'naive-file-name-1', 128,
    'IMAGE', NULL, 'FILE', 1, false, 'naive-id-3', '2022-10-01T14:48:00.000Z');
    INSERT INTO sharing_data VALUES ('naive-file-id-1-0', 'naive-file-name-1-0', 128,
    'IMAGE', NULL, 'FILE', 1, true, 'naive-id-3', '2022-11-01T14:48:00.000Z');
INSERT INTO sharing_data VALUES ('naive-file-id-2', 'naive-file-name-2', 256123,
    'IMAGE', NULL, 'FILE', 0, true, 'naive-id-2', '2022-10-01T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-file-id-3', 'naive-file-name-3', 556123, 'GENERAL', NULL, 'FILE', 8, false, 
    'naive-id-2', '2022-10-05T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-file-id-4', 'naive-file-name-4', 256123, 'IMAGE', NULL, 'FILE', 15, false, 
    'naive-id-2', '2022-10-05T15:49:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-file-id-5', 'naive-file-name-5', 256123, 'IMAGE', NULL, 'FILE', 0, false, 
    'naive-id-2', '2022-10-05T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-link-id-1', NULL, 0, 'LINK', 'https://dev.orka.run', 'LINK', 0, false, 
    'naive-uploader', '2022-10-05T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-link-id-1-0', NULL, 0, 'LINK', 'https://dev.orka.run', 'LINK', 0, false, 
    'naive-id-3', '2022-11-19T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-link-id-3', NULL, 0, 'LINK', 'https://dev.orka.run.hohohohohohohohohohoho', 'LINK', 0, false, 
    'naive-id-2', '2022-10-05T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-text-id-1', NULL, 0, 'TEXT', 'hoho\nasdfasdfad', 'TEXT', 0, false, 
    'naive-id-2', '2022-10-05T15:48:00.000Z');
INSERT INTO sharing_data VALUES (
    'naive-link-id-2', NULL, 0, 'LINK', 'https://orka.run', 'LINK', 0, false, 
    'naive-uploader', '2022-10-05T16:48:00.000Z');
        `)
    );

    let a = "";

    for (const s of sqls) {
        a += `${s}\n`;
    }
    console.debug(a);
}

const sqls = [];

function middlewareForDebugQuery(sql) {
    sqls.push(sql);
    return sql;
}

export { insertMockData };
