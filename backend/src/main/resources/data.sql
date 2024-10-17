-- 创建用户表（如果不存在）
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 创建用户角色表
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 插入管理员用户
INSERT INTO users (username, email, password) VALUES ('admin', 'admin@123.com', '1234');

-- 为管理员用户添加角色
INSERT INTO user_roles (user_id, role) VALUES (1, 'ADMIN');

-- 创建考试表（如果不存在）
CREATE TABLE IF NOT EXISTS exams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT,
    passing_score INT
);

-- 创建问题表（如果不存在）
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    question_type VARCHAR(50) NOT NULL
);