// For the auto implement feature in IDE, declare table schema object directly.
const TABLE_USERS = {
    name: "users",
    fields: {
        id: "id",
        name: "name",
        profile: "profile",
    },
};

const TABLE_SHARING_DATA = {
    name: "sharing_data",
    fields: {
        id: "id",

        // file related fields
        name: "name",
        // size in bytes
        size: "size",
        extension: "extension",

        // link related fields
        text: "text",

        // common fields
        type: "type",
        status_count: "status_count",
        hands_up: "hands_up",
        uploader_id: "uploader_id",
        uploaded_at: "uploaded_at",
    },
};

const TABLE_COMMENTS = {
    name: "comments",
    fields: {
        id: "id",
        data_id: "data_id",
        // data_type could be either FILE or LINK
        data_type: "data_type",
        text: "text",
        sender_id: "sender_id",
        receiver_id: "receiver_id",
        created_at: "created_at",
    },
};

const TABLE_COMMENT_METADATA = {
    name: "comment_metadata",
    fields: {
        data_id: "data_id",
        last_read_comment_id: "last_read_comment_id",
    },
};

const TABLE_NOTIFICATIONS = {
    name: "notifications",
    fields: {
        id: "id",
        // type could be either STATUS or COMMENT
        type: "type",
        text: "text",
        data_id: "data_id",
        sender_id: "sender_id",
        created_at: "created_at",
    },
};

const DDLQueries = `
CREATE TABLE IF NOT EXISTS ${TABLE_USERS.name} (
    ${TABLE_USERS.fields.id} TEXT PRIMARY KEY,
    ${TABLE_USERS.fields.name} TEXT NOT NULL,
    ${TABLE_USERS.fields.profile} INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS ${TABLE_COMMENTS.name} (
    ${TABLE_COMMENTS.fields.id} TEXT PRIMARY KEY,
    ${TABLE_COMMENTS.fields.data_id} TEXT NOT NULL,
    ${TABLE_COMMENTS.fields.data_type} TEXT NOT NULL,
    ${TABLE_COMMENTS.fields.text} TEXT NOT NULL,
    ${TABLE_COMMENTS.fields.sender_id} TEXT NOT NULL,
    ${TABLE_COMMENTS.fields.receiver_id} TEXT NOT NULL,
    ${TABLE_COMMENTS.fields.created_at} TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS ${TABLE_COMMENT_METADATA.name} (
    ${TABLE_COMMENT_METADATA.fields.data_id} TEXT PRIMARY KEY,
    ${TABLE_COMMENT_METADATA.fields.last_read_comment_id} TEXT NULL
);
CREATE TABLE IF NOT EXISTS ${TABLE_NOTIFICATIONS.name} (
    ${TABLE_NOTIFICATIONS.fields.id} TEXT PRIMARY KEY,
    ${TABLE_NOTIFICATIONS.fields.type} TEXT NOT NULL,
    ${TABLE_NOTIFICATIONS.fields.text} TEXT NOT NULL,
    ${TABLE_NOTIFICATIONS.fields.data_id} TEXT NOT NULL,
    ${TABLE_NOTIFICATIONS.fields.sender_id} TEXT NOT NULL,
    ${TABLE_NOTIFICATIONS.fields.created_at} TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS ${TABLE_SHARING_DATA.name} (
    ${TABLE_SHARING_DATA.fields.id} TEXT PRIMARY KEY,
    ${TABLE_SHARING_DATA.fields.name} TEXT NULL,
    ${TABLE_SHARING_DATA.fields.size} INTEGER NULL,
    ${TABLE_SHARING_DATA.fields.extension} TEXT NULL,
    ${TABLE_SHARING_DATA.fields.text} TEXT NULL,
    ${TABLE_SHARING_DATA.fields.type} TEXT NOT NULL,
    ${TABLE_SHARING_DATA.fields.status_count} INTEGER NOT NULL,
    ${TABLE_SHARING_DATA.fields.hands_up} BOOLEAN NOT NULL,
    ${TABLE_SHARING_DATA.fields.uploader_id} TEXT NOT NULL,
    ${TABLE_SHARING_DATA.fields.uploaded_at} TIMESTAMP NOT NULL
);
`;

export {
    DDLQueries,
    TABLE_USERS,
    TABLE_SHARING_DATA,
    TABLE_COMMENTS,
    TABLE_COMMENT_METADATA,
    TABLE_NOTIFICATIONS,
};
