select * from infografis

select * from role

delete from role where name ="user"

ALTER TABLE role AUTO_INCREMENT = 1;

INSERT INTO role (name, createdAt, updatedAt) VALUES ('user', now(), now());
INSERT INTO role (name, createdAt, updatedAt) VALUES ('admin', now(), now());