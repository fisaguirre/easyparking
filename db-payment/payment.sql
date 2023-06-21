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


-- Volcando estructura de base de datos para payment
CREATE DATABASE IF NOT EXISTS `payment` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `payment`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: payment
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
-- Table structure for table `cuenta_mercado`
--

DROP TABLE IF EXISTS `cuenta_mercado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta_mercado` (
  `cuenta_mercado_id` int NOT NULL AUTO_INCREMENT,
  `access_token` varchar(150) DEFAULT NULL,
  `mercado_usuario_id` int DEFAULT NULL,
  `username_mercado` varchar(80) DEFAULT NULL,
  `store_id` varchar(50) DEFAULT NULL,
  `external_store_id` varchar(50) DEFAULT NULL,
  `store_name` varchar(50) DEFAULT NULL,
  `pos_id` int DEFAULT NULL,
  `external_pos_id` varchar(50) DEFAULT NULL,
  `pos_name` varchar(50) DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`cuenta_mercado_id`),
  KEY `FK_cuenta_mercado_usuario_id` (`usuario_id`),
  CONSTRAINT `FK_cuenta_mercado_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta_mercado`
--

LOCK TABLES `cuenta_mercado` WRITE;
/*!40000 ALTER TABLE `cuenta_mercado` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuenta_mercado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `pago_id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `precio_total` int DEFAULT NULL,
  `tiempo_inicio` time DEFAULT NULL,
  `tiempo_fin` time DEFAULT NULL,
  `tiempo_total` int DEFAULT NULL,
  `cantidad_tarjetas` int DEFAULT NULL,
  `patente` varchar(50) DEFAULT NULL,
  `cuenta_mercado_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`pago_id`),
  KEY `FK_pago_usuario_id` (`usuario_id`),
  KEY `FK_pago_cuenta_mercado_id` (`cuenta_mercado_id`),
  CONSTRAINT `FK_pago_cuenta_mercado_id` FOREIGN KEY (`cuenta_mercado_id`) REFERENCES `cuenta_mercado` (`cuenta_mercado_id`),
  CONSTRAINT `FK_pago_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,'2023-06-21',60,'00:00:00','00:00:00',0,1,'AAA-333',1,3);
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
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
INSERT INTO `usuario` VALUES (1,'25c0a679-a86b-4751-92de-e9a7a16cae94','ralvarez','pbkdf2:sha256:260000$z2owkLdcbUhDrA1g$7c34751d014cccda406d343b83844fdd19ab1c5adb134023a59a0f2fff299624','Raul','Alvarez','r.alvarez@gmail.com','30485765','admin'),(2,'14f5978b-7b79-4a31-bef4-9b9e6c211b8f','fedehernandez','pbkdf2:sha256:260000$pXtkih3JZQM4Q95Z$35373dfe39621af08ca8f3b5a1951c8090837a64b1b533276bd27dfff7c3e028','Federico','Hernandez','f.hernandez@gmail.com','28987675','admin'),(3,'22935b41-9acc-4a66-a52b-29c0441557ff','igchaves','pbkdf2:sha256:260000$uoYNbQNwMGEjd2MK$aa487ce9fce27826689bbb34366cfb55c3def3d32b8eebe21da23cf05217e580','Ignacio','Chaves','i.chaves@gmail.com','40987675','tarjetero'),(4,'ff282b7d-4dda-43f4-ae06-914dd83c893c','jugonzalez','pbkdf2:sha256:260000$If4oMDyGk1RfYnAx$93c13cbb3b52d683dc22b36e079f848b28b5ca2759a8a9aacac898779c4ab46b','Julia','Gonzalez','ju.gonzalez@gmail.com','38789674','tarjetero'),(5,'f8246604-f249-44a7-965f-dcefae3ff190','jesrodriguez','pbkdf2:sha256:260000$1DeSpfE0PFGUurEZ$4b19a1b8ad62da6dc89e4f209c4e62532557f090bcf85945df559b0d8ee29a28','Jesica','Rodriguez','je.rodriguez@gmail.com','39879098','tarjetero');
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

-- Dump completed on 2023-06-21  2:38:17