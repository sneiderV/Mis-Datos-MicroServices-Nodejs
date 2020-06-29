-- DB 
CREATE DATABASE leal;

--USER TABLE
CREATE TABLE `user` (
  `user_id` varchar(200) NOT NULL,
  `created_date` datetime NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


--TRANSACTION TABLE
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `value` float NOT NULL,
  `points` int NOT NULL,
  `status` int NOT NULL,
  `user_id` varchar(200) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
