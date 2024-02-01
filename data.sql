CREATE DATABASE cranium;


CREATE TABLE models (
    id VARCHAR(255) PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    height INT,
    width INT,
    model_desc JSON NOT NULL,
    model_image JSON NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_pwd  VARCHAR(255) NOT NULL,
)

