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


-- Volcando estructura de base de datos para parkinglocation
CREATE DATABASE IF NOT EXISTS `parkinglocation` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `parkinglocation`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: parkinglocation
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
-- Table structure for table `estacionamiento`
--

DROP TABLE IF EXISTS `estacionamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estacionamiento` (
  `estacionamiento_id` int NOT NULL AUTO_INCREMENT,
  `latitud` varchar(100) DEFAULT NULL,
  `longitud` varchar(100) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `cantidad_lugares` int DEFAULT NULL,
  `cantidad_disponible` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`estacionamiento_id`),
  KEY `FK_estacionamiento_usuario_id` (`usuario_id`),
  CONSTRAINT `FK_estacionamiento_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estacionamiento`
--

LOCK TABLES `estacionamiento` WRITE;
/*!40000 ALTER TABLE `estacionamiento` DISABLE KEYS */;
INSERT INTO `estacionamiento` VALUES (1,'-32.89247410598468','-68.84534092590613','Av. Bartolomé Mitre 830, M5500BZA Capital, Mendoza, Argentina',0,10,3),(2,'-32.89105675113822','-68.84089088923639','9 de Julio 1100, M5500ALH M5500ALH, Mendoza, Argentina',0,3,4),(3,'-32.8913782543312','-68.85030881133177','Av. Belgrano 873, M5500 Mendoza, Argentina',0,0,5);
/*!40000 ALTER TABLE `estacionamiento` ENABLE KEYS */;
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
INSERT INTO `usuario` VALUES (1,'25c0a679-a86b-4751-92de-e9a7a16cae94','ralvarez','pbkdf2:sha256:260000$8cfYORMgbs0d8Sds$9c7dfc770be1f6d1bd99cab7462c23bd34941ceae102a34b01a5f3abdf47f516','Raul','Alvarez','r.alvarez@gmail.com','30485765','admin'),(2,'14f5978b-7b79-4a31-bef4-9b9e6c211b8f','fedehernandez','pbkdf2:sha256:260000$CpKloH3kdWGpWA73$5fc40072aecf6dab7e47665bc48a2ec8574035d4f26d2aae5e672ea45d590882','Federico','Hernandez','f.hernandez@gmail.com','28987675','admin'),(3,'22935b41-9acc-4a66-a52b-29c0441557ff','igchaves','pbkdf2:sha256:260000$NvWmqWNdIMge5INy$a645a25ce33caf7ddac1c6917ab7239d956e1d659c5b8b46724bda4b91937576','Ignacio','Chaves','i.chaves@gmail.com','40987675','tarjetero'),(4,'ff282b7d-4dda-43f4-ae06-914dd83c893c','jugonzalez','pbkdf2:sha256:260000$Owi9vkYuFMuG90F7$ad8bb793050fbd5684ff69b343e4a15572f489ed796f791a20549172ed3ac395','Julia','Gonzalez','ju.gonzalez@gmail.com','38789674','tarjetero'),(5,'f8246604-f249-44a7-965f-dcefae3ff190','jesrodriguez','pbkdf2:sha256:260000$S0doEWJwAIVVdSPg$ce9f39170b3be34f11f072245c31eda418c8e60efcf3fd86572c8cde63ba5dc8','Jesica','Rodriguez','je.rodriguez@gmail.com','39879098','tarjetero');
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

-- Dump completed on 2023-06-21  2:37:33