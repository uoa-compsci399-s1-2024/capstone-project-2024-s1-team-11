CREATE DATABASE maths_rocks

CREATE TABLE maths_topic (
    topic_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255)
);

CREATE TABLE user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    user_pw VARCHAR(255),
    user_email VARCHAR(255)
);