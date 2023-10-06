CREATE TABLE IF NOT EXISTS users (
    id CHAR(16) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    profile INT8 NOT NULL
);
CREATE TABLE IF NOT EXISTS sharing_data (
    id CHAR(16) PRIMARY KEY,
    name VARCHAR(50) NULL,
    size INT32 NULL,
    extension VARCHAR(50) NULL,
    text TEXT NULL,
    type VARCHAR(50) NOT NULL,
    status_count INT16 NOT NULL,
    hands_up BOOLEAN NOT NULL,
    uploader_id CHAR(16) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS notifications (
    id CHAR(16) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    data_id CHAR(16) NOT NULL,
    data_type VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL
);
