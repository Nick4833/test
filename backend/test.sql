CREATE TABLE `test`.`posts` (
  `idpost` INT NOT NULL,
  `title` VARCHAR(255) NULL,
  `content` LONGTEXT NULL,
  PRIMARY KEY (`idpost`));
  
  CREATE TABLE `test`.`users` (
  `iduser` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `password` LONGTEXT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);
  
ALTER TABLE `test`.`posts` 
ADD COLUMN `user_id` INT NULL AFTER `content`
;
ALTER TABLE `test`.`posts` 
ADD CONSTRAINT `user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `test`.`users` (`iduser`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;




SELECT COUNT(idpost) AS total FROM `test`.posts; 
SELECT * FROM `test`.posts;
SELECT * FROM `test`.users;