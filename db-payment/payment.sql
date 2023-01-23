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

-- Volcando estructura para tabla payment.cuenta_mercado
CREATE TABLE IF NOT EXISTS `cuenta_mercado` (
  `cuenta_mercado_id` int(11) NOT NULL AUTO_INCREMENT,
  `access_token` varchar(150) DEFAULT NULL,
  `mercado_usuario_id` int(20) DEFAULT NULL,
  `store_id` varchar(50) DEFAULT NULL,
  `external_store_id` varchar(50) DEFAULT NULL,
  `pos_id` int(30) DEFAULT NULL,
  `external_pos_id` varchar(50) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cuenta_mercado_id`),
  KEY `FK_cuenta_mercado_usuario_id` (`usuario_id`),
  CONSTRAINT `FK_cuenta_mercado_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla payment.cuenta_mercado: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cuenta_mercado` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuenta_mercado` ENABLE KEYS */;

-- Volcando estructura para tabla payment.pago
CREATE TABLE IF NOT EXISTS `pago` (
  `pago_id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_pago` varchar(50) DEFAULT NULL,
  `fecha` varchar(50) DEFAULT NULL,
  `hora` int(15) DEFAULT NULL,
  `minutos` int(15) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`pago_id`),
  KEY `FK_pago_usuario_id` (`usuario_id`),
  CONSTRAINT `FK_pago_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla payment.pago: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;

-- Volcando estructura para tabla payment.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `public_id` varchar(150) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla payment.usuario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;