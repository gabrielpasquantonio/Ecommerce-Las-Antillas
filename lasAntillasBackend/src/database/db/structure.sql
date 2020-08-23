CREATE TABLE IF NOT EXISTS `products` (
   `id` INT AUTO_INCREMENT,
   `brand_id` INT NOT NULL,
   `category_id` INT NOT NULL,
   `image` VARCHAR(100) NOT NULL,
   `createdAt` TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE KEY unique_image (image)
);

CREATE TABLE IF NOT EXISTS `atributes` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `categories` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `atributeProduct` (
   `id` INT AUTO_INCREMENT,
   `atribute_id` INT NOT NULL,
   `product_id` INT NOT NULL,
   `value` VARCHAR(100) NOT NULL,
   `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
   PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `brands` (
   `id` INT AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `brandCategory` (
   `id` INT AUTO_INCREMENT,
   `brand_id` INT NOT NULL,
   `category_id` INT NOT NULL,
   `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users` (
   `id` INT AUTO_INCREMENT,
   `first_name` VARCHAR(100) NOT NULL,
   `last_name` VARCHAR(100) NOT NULL,
   `username` VARCHAR(100) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `avatar` VARCHAR(100) NOT NULL DEFAULT 'default.png',
   `rol_id` INT NOT NULL,
   `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   `deletedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE KEY unique_email (email),
   UNIQUE KEY unique_avatar (avatar)
);

CREATE TABLE IF NOT EXISTS `rols` (
   `id` INT AUTO_INCREMENT,
   `label` VARCHAR(100),
   PRIMARY KEY (`id`)
);

ALTER TABLE `products` ADD CONSTRAINT `products_fk_0_brand_id` FOREIGN KEY (brand_id) REFERENCES `brands`(`id`) ;
ALTER TABLE `products` ADD CONSTRAINT `products_fk_0_category_id` FOREIGN KEY (category_id) REFERENCES `categories`(`id`) ;
ALTER TABLE `atributeProduct` ADD CONSTRAINT `atributeProduct_fk_0_atribute_id` FOREIGN KEY (atribute_id) REFERENCES `atributes`(`id`) ;
ALTER TABLE `atributeProduct` ADD CONSTRAINT `atributeProduct_fk_0_product_id` FOREIGN KEY (product_id) REFERENCES `products`(`id`) ;
ALTER TABLE `brandCategory` ADD CONSTRAINT `brandCategory_fk_0_brand_id` FOREIGN KEY (brand_id) REFERENCES `brands`(`id`) ;
ALTER TABLE `brandCategory` ADD CONSTRAINT `brandCategory_fk_0_category_id` FOREIGN KEY (category_id) REFERENCES `categories`(`id`) ;
ALTER TABLE `users` ADD CONSTRAINT `users_fk_0_rol_id` FOREIGN KEY (rol_id) REFERENCES `rols`(`id`) ;
