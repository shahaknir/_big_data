


//fix problem with password
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';

/*
  DB
*/
CREATE DATABASE inventory 


/*
  countries
*/

CREATE TABLE `inventory`.`countries` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `countryId` VARCHAR(45) NOT NULL UNIQUE,
  `countryName` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`, `countryId`));
  
  
/*
  locations
*/
CREATE TABLE `inventory`.`locations` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `locationId` VARCHAR(45) NOT NULL UNIQUE,
  `locationName` VARCHAR(45) NOT NULL ,
  `countryId` VARCHAR(45) NOT NULL ,
  FOREIGN KEY (`countryId`) REFERENCES countries(`countryId`),
  PRIMARY KEY (`id`, `locationId`,`countryId`));
  



 
/*
  products
*/
CREATE TABLE `inventory`.`products` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `productId` VARCHAR(45) NOT NULL UNIQUE,
  `serialNumber` VARCHAR(45) NOT NULL ,
  `productName` VARCHAR(45) NOT NULL ,
  `PONumber` VARCHAR(45) NOT NULL,
  `warranty` DATE NULL,
  `date` DATE NOT NULL,
  `locationId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `productId`),
  FOREIGN KEY (`locationId`) REFERENCES locations(`locationId`));
  
  

/*
  logsProducts
*/ 
CREATE TABLE `inventory`.`logsProducts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `logId` VARCHAR(45) NOT NULL UNIQUE,
  `action` VARCHAR(45) NOT NULL,
  `userCreateAction` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `storage` VARCHAR(100) NOT NULL,
  `productId` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`, `logId`));
--   ,
-- FOREIGN KEY (`productId`) REFERENCES products(`productId`));



/*
  users
*/
CREATE TABLE `inventory`.`users` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `userId` VARCHAR(45) NOT NULL UNIQUE,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `name` VARCHAR(45) NOT NULL,
  `permission` VARCHAR(45) NULL,
  `password` VARCHAR(100) NOT NULL,
  `createdAt` DATE NOT NULL,
  PRIMARY KEY (`id`, `userId`, `email`));
  
/*
  logsUsers
*/ 
 CREATE TABLE `inventory`.`logsUsers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `logId` VARCHAR(45) NOT NULL UNIQUE,
  `userId` VARCHAR(45) NOT NULL,
  `userCreateAction` VARCHAR(45) NOT NULL,
  `action` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`,`logId`));
 


/*
  offices
*/ 
CREATE TABLE `inventory`.`offices` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `officeId` VARCHAR(45) NOT NULL UNIQUE,
  `officeName` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`, `officeId`));
  
 /*
  employees
*/ 
CREATE TABLE `inventory`.`employees` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `employeeId` VARCHAR(45) NOT NULL UNIQUE,
  `employeeName` VARCHAR(45) NOT NULL ,
  `officeId` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`,`employeeId`),
  FOREIGN KEY (`officeId`) REFERENCES offices(`officeId`));


/*
  officeEquipment
*/ 
CREATE TABLE `inventory`.`officeEquipment` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `equipmentId` VARCHAR(45) NOT NULL UNIQUE,
  `equipmentName` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`,`equipmentId`));



/*
  officeEquipmentForEmployees
*/
CREATE TABLE `inventory`.`officeEquipmentForEmployees` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  -- `equipmentId` VARCHAR(45) NOT NULL ,
  `employeeId` VARCHAR(45) UNIQUE NOT NULL ,
  `screen` VARCHAR(45) NOT NULL ,
  `tv` VARCHAR(45) NOT NULL ,
  `dockingStation` VARCHAR(45) NOT NULL ,
  `ipPhone` VARCHAR(45) NOT NULL ,
  `desktopComputer` VARCHAR(45) NOT NULL ,
  `laptop` VARCHAR(45) NOT NULL ,
  `printer` VARCHAR(45) NOT NULL ,
  `headset` VARCHAR(45) NOT NULL ,
  `webCamera` VARCHAR(45) NOT NULL ,
  -- `sum` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`,`employeeId`),
  -- FOREIGN KEY (`equipmentId`) REFERENCES officeEquipment(`equipmentId`),
  FOREIGN KEY (`employeeId`) REFERENCES employees(`employeeId`));

