CREATE DATABASE data_inference;

USE data_inference;

CREATE TABLE detections (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(180),
    objects VARCHAR(500),
    image_result VARCHAR(200)
);

DESCRIBE detections;