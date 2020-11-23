DROP DATABASE IF EXISTS ansim;
CREATE DATABASE ansim;
USE ansim;

GRANT ALL PRIVILEGES ON ansim.* TO 'ansim'@'localhost' IDENTIFIED BY 'ansim';
GRANT ALL PRIVILEGES ON ansim.* TO 'ansim'@'127.0.0.1' IDENTIFIED BY 'ansim';
GRANT ALL PRIVILEGES ON ansim.* TO 'ansim'@'::1' IDENTIFIED BY 'ansim';
FLUSH PRIVILEGES;


DROP TABLE IF EXISTS member;
CREATE TABLE member(
        member_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(80) NOT NULL UNIQUE KEY,
        password VARCHAR(60) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK(type IN ('admin', 'owner', 'customer')),
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS restaurant_category;
CREATE TABLE restaurant_category(
        category_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        parent_id BIGINT,
        name VARCHAR(255) NOT NULL,

        FOREIGN KEY(parent_id) REFERENCES restaurant_category(category_id)
);

DROP TABLE IF EXISTS restaurant;
CREATE TABLE restaurant(
        restaurant_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        category_id BIGINT NOT NULL,
        member_id BIGINT,

        name VARCHAR(255) NOT NULL,
        owner VARCHAR(255),
        phone VARCHAR(20),
        location VARCHAR(1024) NOT NULL,
        description LONGTEXT NOT NULL,
        api_code_mafra VARCHAR(255),
        api_code_gg VARCHAR(255),
        is_trusty TINYINT(1) NOT NULL DEFAULT 0 CHECK(is_trusty IN (0, 1)),
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(category_id) REFERENCES restaurant_category(category_id),
        FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS review;
CREATE TABLE review(
        review_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        restaurant_id BIGINT NOT NULL,
        member_id BIGINT NOT NULL,

        score TINYINT(1) NOT NULL CHECK(score >= 0 AND score <= 5),
        content LONGTEXT NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(restaurant_id) REFERENCES restaurant(restaurant_id),
        FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS board;
CREATE TABLE board(
        board_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS document_category;
CREATE TABLE document_category(
        category_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        parent_id BIGINT,
        board_id BIGINT NOT NULL,

        name VARCHAR(255) NOT NULL,

        FOREIGN KEY(parent_id) REFERENCES document_category(category_id),
        FOREIGN KEY(board_id) REFERENCES board(board_id)
);

DROP TABLE IF EXISTS document;
CREATE TABLE document(
        document_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        board_id BIGINT NOT NULL,
        category_id BIGINT NOT NULL,
        member_id BIGINT NOT NULL,

        title VARCHAR(255) NOT NULL,
        content LONGTEXT NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(board_id) REFERENCES board(board_id),
        FOREIGN KEY(category_id) REFERENCES document_category(category_id),
        FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
        comment_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        parent_id BIGINT,
        document_id BIGINT NOT NULL,
        member_id BIGINT NOT NULL,

        content LONGTEXT NOT NULL,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(parent_id) REFERENCES comment(comment_id),
        FOREIGN KEY(document_id) REFERENCES document(document_id),
        FOREIGN KEY(member_id) REFERENCES member(member_id)
);

DROP TABLE IF EXISTS vote;
CREATE TABLE vote(
        vote_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        member_id BIGINT NOT NULL,

        document_id BIGINT,
        comment_id BIGINT,

        type VARCHAR(10) NOT NULL CHECK(type IN ('good', 'bad')),
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(member_id) REFERENCES member(member_id),
        FOREIGN KEY(document_id) REFERENCES document(document_id),
        FOREIGN KEY(comment_id) REFERENCES comment(comment_id)
);
