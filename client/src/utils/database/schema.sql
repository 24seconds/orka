CREATE TABLE IF NOT EXISTS users (
    id CHAR(16) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    profile INT8 NOT NULL
);
CREATE TABLE IF NOT EXISTS files (
    id CHAR(16) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    size INT32 NOT NULL,
    type VARCHAR(50) NOT NULL,
    download_count INT16 NOT NULL,
    hands_up BOOLEAN NOT NULL,
    uploaded_by CHAR(16) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS links (
    id CHAR(16) PRIMARY KEY,
    text TEXT NOT NULL,
    view_count INT16 NOT NULL,
    hands_up BOOLEAN NOT NULL,
    uploaded_by CHAR(16) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS comments (
    id CHAR(16) PRIMARY KEY,
    data_id CHAR(16) NOT NULL,
    data_type VARCHAR(16) NOT NULL,
    text TEXT NOT NULL,
    sender_id CHAR(16) NOT NULL,
    receiver_id CHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS comment_metadata (
    data_id CHAR(16) PRIMARY KEY,
    last_read_comment_id CHAR(16)
);
CREATE TABLE IF NOT EXISTS notifications (
    id CHAR(16) PRIMARY KEY,
    text TEXT NOT NULL,
    data_id CHAR(16) NOT NULL,
    data_type VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL
);
