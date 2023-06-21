-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.7-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para userparkingcontrol
CREATE DATABASE IF NOT EXISTS `userparkingcontrol` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `userparkingcontrol`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: userparkingcontrol
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tarjeta`
--

DROP TABLE IF EXISTS `tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjeta` (
  `tarjeta_id` int NOT NULL AUTO_INCREMENT,
  `cantidad_tarjeta` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`tarjeta_id`),
  KEY `FK_tarjeta_usuario_id` (`usuario_id`),
  CONSTRAINT `FK_tarjeta_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjeta`
--

LOCK TABLES `tarjeta` WRITE;
/*!40000 ALTER TABLE `tarjeta` DISABLE KEYS */;
INSERT INTO `tarjeta` VALUES (1,39,3),(2,25,4);
/*!40000 ALTER TABLE `tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjeta_instancia`
--

DROP TABLE IF EXISTS `tarjeta_instancia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjeta_instancia` (
  `tarjeta_instancia_id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `dia_semana` varchar(50) DEFAULT NULL,
  `tiempo_inicio` time DEFAULT NULL,
  `tiempo_fin` time DEFAULT NULL,
  `patente` varchar(50) DEFAULT NULL,
  `finalizada` varchar(15) DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `tarjeta_id` int DEFAULT NULL,
  PRIMARY KEY (`tarjeta_instancia_id`) USING BTREE,
  KEY `FK_tarjeta_instancia_usuario_id` (`usuario_id`),
  KEY `FK_tarjeta_instancia_tarjeta_id` (`tarjeta_id`),
  CONSTRAINT `FK_tarjeta_instancia_tarjeta_id` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjeta` (`tarjeta_id`),
  CONSTRAINT `FK_tarjeta_instancia_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjeta_instancia`
--

LOCK TABLES `tarjeta_instancia` WRITE;
/*!40000 ALTER TABLE `tarjeta_instancia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjeta_instancia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `public_id` varchar(150) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dni` varchar(60) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'25c0a679-a86b-4751-92de-e9a7a16cae94','ralvarez','pbkdf2:sha256:260000$223N4nJ8fJzkLIsA$9863ded88f8a893ac9ae69031a49032981248a27488a387dba0f3bc241f51825','Raul','Alvarez','r.alvarez@gmail.com','30485765','admin'),(2,'14f5978b-7b79-4a31-bef4-9b9e6c211b8f','fedehernandez','pbkdf2:sha256:260000$SmXXlbL0jzZd0AGj$7f542a81235691187f821b8f12f379dfa6dc750747f31a86819bbb0a16463d98','Federico','Hernandez','f.hernandez@gmail.com','28987675','admin'),(3,'22935b41-9acc-4a66-a52b-29c0441557ff','igchaves','pbkdf2:sha256:260000$hgDIbu8jPV7Ml7Ki$e0fe731220bb806a70159928fe950e5fc19fa8e6acc241ab5092d5b3a6d24aba','Ignacio','Chaves','i.chaves@gmail.com','40987675','tarjetero'),(4,'ff282b7d-4dda-43f4-ae06-914dd83c893c','jugonzalez','pbkdf2:sha256:260000$XPVsPATOVY8tST2y$8f3892c4130b58132d3f3e96e4284898af9fec1170c97fe06dc27b28111dd534','Julia','Gonzalez','ju.gonzalez@gmail.com','38789674','tarjetero'),(5,'f8246604-f249-44a7-965f-dcefae3ff190','jesrodriguez','pbkdf2:sha256:260000$fEgEOIArShAlJka7$4be62da3f489c69adc3362adc44fb51d9e5da060572ffb49449c44e12b842be5','Jesica','Rodriguez','je.rodriguez@gmail.com','39879098','tarjetero');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-21  2:37:57