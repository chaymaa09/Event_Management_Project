-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: event-management
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `event-management`
--

/*!40000 DROP DATABASE IF EXISTS `event-management`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `event-management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `event-management`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'TECH',NULL,NULL,NULL),(2,'AI',NULL,NULL,NULL),(3,'ART_CULTURE',NULL,NULL,NULL),(4,'CLIMATE',NULL,NULL,NULL),(5,'WELLNESS',NULL,NULL,NULL),(6,'CYBER_SECURITY',NULL,NULL,NULL),(7,'FITNESS',NULL,NULL,NULL),(8,'PARTY',NULL,NULL,NULL),(9,'CRYPTO',NULL,NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_subscribers`
--

DROP TABLE IF EXISTS `category_subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_subscribers` (
  `user_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `category_subscribers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_subscribers_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_subscribers`
--

LOCK TABLES `category_subscribers` WRITE;
/*!40000 ALTER TABLE `category_subscribers` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `continent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_city_continent` (`continent_id`),
  CONSTRAINT `fk_city_continent` FOREIGN KEY (`continent_id`) REFERENCES `continent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'https://images.lumacdn.com/discovery/lagos-icon.png','assets/cities/images/lagos.jpg','Lagos',1),(2,'https://images.lumacdn.com/discovery/nairobi-icon.png','assets/cities/images/nairobi.jpg','Nairobi',1),(3,'https://images.lumacdn.com/discovery/bangkok-icon.png','assets/cities/images/bangkok.jpg','Bangkok',3),(4,'https://images.lumacdn.com/discovery/bangalore-icon.png','assets/cities/images/bengaluru.jpg','Bengaluru',3),(5,'https://images.lumacdn.com/discovery/brisbane-icon.png','assets/cities/images/brisbane.jpg','Brisbane',3),(6,'https://images.lumacdn.com/discovery/dubai-icon.png','assets/cities/images/dubai.jpg','Dubai',3),(7,'https://images.lumacdn.com/discovery/hcm-icon.png','assets/cities/images/hochiminhcity.jpg','Ho Chi Minh City',3),(8,'https://images.lumacdn.com/discovery/hk-icon.png','assets/cities/images/hongkong.jpg','Hong Kong',3),(9,'https://images.lumacdn.com/discovery/hnl-icon.png','assets/cities/images/honolulu.jpg','Honolulu',3),(10,'https://images.lumacdn.com/discovery/jakarta-icon.png','assets/cities/images/jakarta.jpg','Jakarta',3),(11,'https://images.lumacdn.com/discovery/kl-icon.png','assets/cities/images/kualalumpur.jpg','Kuala Lumpur',3),(12,'https://images.lumacdn.com/discovery/manila-icon.png','assets/cities/images/manila.jpg','Manila',3),(13,'https://images.lumacdn.com/discovery/mel-icon.png','assets/cities/images/melbourne.jpg','Melbourne',3),(14,'https://images.lumacdn.com/discovery/mumbai-icon.png','assets/cities/images/mumbai.jpg','Mumbai',3),(15,'https://images.lumacdn.com/discovery/newdelhi-icon.png','assets/cities/images/newdelhi.jpg','New Delhi',3),(16,'https://images.lumacdn.com/discovery/seoul-icon.png','assets/cities/images/seoul.jpg','Seoul',3),(17,'https://images.lumacdn.com/discovery/sg-icon.png','assets/cities/images/singapore.jpg','Singapore',3),(18,'https://images.lumacdn.com/discovery/sydney-icon.png','assets/cities/images/sydney.jpg','Sydney',3),(19,'https://images.lumacdn.com/discovery/taipei-icon.png','assets/cities/images/taipei.jpg','Taipei',3),(20,'https://images.lumacdn.com/discovery/telaviv-icon.png','assets/cities/images/telaviv-yafo.jpg','Tel Aviv-Yafo',3),(21,'https://images.lumacdn.com/discovery/tokyo-icon.png','assets/cities/images/tokyo.jpg','Tokyo',3),(22,'https://images.lumacdn.com/discovery/atlanta-icon.png','assets/cities/images/atlanta.jpg','Atlanta',4),(23,'https://images.lumacdn.com/discovery/austin-icon.png','assets/cities/images/austin.jpg','Austin',4),(24,'https://images.lumacdn.com/discovery/boston-icon.png','assets/cities/images/boston.jpg','Boston',4),(25,'https://images.lumacdn.com/discovery/calgary-icon.png','assets/cities/images/calgary.jpg','Calgary',4),(26,'https://images.lumacdn.com/discovery/chicago-icon.png','assets/cities/images/chicago.jpg','Chicago',4),(27,'https://images.lumacdn.com/discovery/dallas-icon.png','assets/cities/images/dallas.jpg','Dallas',4),(28,'https://images.lumacdn.com/discovery/denver-icon.png','assets/cities/images/denver.jpg','Denver',4),(29,'https://images.lumacdn.com/discovery/houston-icon.png','assets/cities/images/houston.jpg','Houston',4),(30,'https://images.lumacdn.com/discovery/vegas-icon.png','assets/cities/images/lasvegas.jpg','Las Vegas',4),(31,'https://images.lumacdn.com/discovery/la-icon.png','assets/cities/images/losangeles.jpg','Los Angeles',4),(32,'https://images.lumacdn.com/discovery/cdmx-icon.png','assets/cities/images/mexicocity.jpg','Mexico City',4),(33,'https://images.lumacdn.com/discovery/miami-icon.png','assets/cities/images/miami.jpg','Miami',4),(34,'https://images.lumacdn.com/discovery/montreal-icon.png','assets/cities/images/montreal.jpg','Montréal',4),(35,'https://images.lumacdn.com/discovery/nyc-icon.png','assets/cities/images/newyork.jpg','New York',4),(36,'https://images.lumacdn.com/discovery/philly-icon.png','assets/cities/images/philadelphia.jpg','Philadelphia',4),(37,'https://images.lumacdn.com/discovery/phx-icon.png','assets/cities/images/phoenix.jpg','Phoenix',4),(38,'https://images.lumacdn.com/discovery/portland-icon.png','assets/cities/images/portland.jpg','Portland',4),(39,'https://images.lumacdn.com/discovery/slc-icon.png','assets/cities/images/saltlakecity.jpg','Salt Lake City',4),(40,'https://images.lumacdn.com/discovery/sd-icon.png','assets/cities/images/sandiego.jpg','San Diego',4),(41,'https://images.lumacdn.com/discovery/sf-icon.png','assets/cities/images/sanfrancisco.jpg','San Francisco',4),(42,'https://images.lumacdn.com/discovery/seattle-icon.png','assets/cities/images/seattle.jpg','Seattle',4),(43,'https://images.lumacdn.com/discovery/toronto-icon.png','assets/cities/images/toronto.jpg','Toronto',4),(44,'https://images.lumacdn.com/discovery/vancouver-icon.png','assets/cities/images/vancouver.jpg','Vancouver',4),(45,'https://images.lumacdn.com/discovery/dc-icon.png','assets/cities/images/washington,dc.jpg','Washington, DC',4),(46,'https://images.lumacdn.com/discovery/waterloo-icon.png','assets/cities/images/waterloo.jpg','Waterloo',4),(47,'https://images.lumacdn.com/discovery/bogota-icon.png','assets/cities/images/bogota.jpg','Bogotá',5),(48,'https://images.lumacdn.com/discovery/ba-icon.png','assets/cities/images/buenosaires.jpg','Buenos Aires',5),(49,'https://images.lumacdn.com/discovery/medellin-icon.png','assets/cities/images/medellin.jpg','Medellín',5),(50,'https://images.lumacdn.com/discovery/rio-icon.png','assets/cities/images/riodejaneiro.jpg','Rio de Janeiro',5),(51,'https://images.lumacdn.com/discovery/sp-icon.png','assets/cities/images/saopaulo.jpg','São Paulo',5),(60,'https://images.lumacdn.com/discovery/ams-icon.png','assets/cities/images/amsterdam.jpg','Amsterdam',2),(61,'https://images.lumacdn.com/discovery/bcn-icon.png','assets/cities/images/barcelona.jpg','Barcelona',2),(62,'https://images.lumacdn.com/discovery/berlin-icon.png','assets/cities/images/berlin.jpg','Berlin',2),(63,'https://images.lumacdn.com/discovery/brussels-icon.png','assets/cities/images/brussels.jpg','Brussels',2),(64,'https://images.lumacdn.com/discovery/budapest-icon.png','assets/cities/images/budapest.jpg','Budapest',2),(65,'https://images.lumacdn.com/discovery/cph-icon.png','assets/cities/images/copenhagen.jpg','Copenhagen',2),(66,'https://images.lumacdn.com/discovery/dublin-icon.png','assets/cities/images/dublin.jpg','Dublin',2),(67,'https://images.lumacdn.com/discovery/geneva-icon.png','assets/cities/images/geneva.jpg','Geneva',2),(68,'https://images.lumacdn.com/discovery/hamburg-icon.png','assets/cities/images/hamburg.jpg','Hamburg',2),(69,'https://images.lumacdn.com/discovery/helsinki-icon.png','assets/cities/images/helsinki.jpg','Helsinki',2),(70,'https://images.lumacdn.com/discovery/istanbul-icon.png','assets/cities/images/istanbul.jpg','Istanbul',2),(71,'https://images.lumacdn.com/discovery/lausanne-icon.png','assets/cities/images/lausanne.jpg','Lausanne',2),(72,'https://images.lumacdn.com/discovery/lisbon-icon.png','assets/cities/images/lisbon.jpg','Lisbon',2),(73,'https://images.lumacdn.com/discovery/london-icon.png','assets/cities/images/london.jpg','London',2),(74,'https://images.lumacdn.com/discovery/madrid-icon.png','assets/cities/images/madrid.jpg','Madrid',2),(75,'https://images.lumacdn.com/discovery/milan-icon.png','assets/cities/images/milan.jpg','Milan',2),(76,'https://images.lumacdn.com/discovery/munich-icon.png','assets/cities/images/munich.jpg','Munich',2),(77,'https://images.lumacdn.com/discovery/paris-icon.png','assets/cities/images/paris.jpg','Paris',2),(78,'https://images.lumacdn.com/discovery/prague-icon.png','assets/cities/images/prague.jpg','Prague',2),(79,'https://images.lumacdn.com/discovery/rome-icon.png','assets/cities/images/rome.jpg','Rome',2),(80,'https://images.lumacdn.com/discovery/stockholm-icon.png','assets/cities/images/stockholm.jpg','Stockholm',2),(81,'https://images.lumacdn.com/discovery/vienna-icon.png','assets/cities/images/vienna.jpg','Vienna',2),(82,'https://images.lumacdn.com/discovery/warsaw-icon.png','assets/cities/images/warsaw.jpg','Warsaw',2),(83,'https://images.lumacdn.com/discovery/zurich-icon.png','assets/cities/images/zurich.jpg','Zurich',2);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `continent`
--

DROP TABLE IF EXISTS `continent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `continent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `continent`
--

LOCK TABLES `continent` WRITE;
/*!40000 ALTER TABLE `continent` DISABLE KEYS */;
INSERT INTO `continent` VALUES (1,'Africa'),(3,'Asia & Pacific'),(2,'Europe'),(4,'North America'),(5,'South America');
/*!40000 ALTER TABLE `continent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT '0',
  `is_virtual` tinyint(1) NOT NULL DEFAULT '0',
  `virtual_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` bigint DEFAULT NULL,
  `waiting_list_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `requires_approval` tinyint(1) NOT NULL DEFAULT '0',
  `price` double NOT NULL DEFAULT '0',
  `category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creator_id` bigint NOT NULL,
  `location_id` bigint DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_id` bigint DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_creator` (`creator_id`),
  KEY `idx_start_date` (`start_date`),
  KEY `idx_location` (`location_id`),
  KEY `idx_category` (`category`),
  KEY `idx_price` (`price`),
  KEY `fk_event_category` (`category_id`),
  KEY `FKdlt0s1srth133hmddr12pjouk` (`city_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_event_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKdlt0s1srth133hmddr12pjouk` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'AI Conference 2025','An in-depth conference on Artificial Intelligence trends.','2026-01-01 09:00:00','2026-01-20 09:00:00','2026-01-22 17:00:00',0,0,NULL,500,1,1,299,'AI','/assets/Artificial-Intelligence-Conference-2025-1.jpg',1,1,'2026-01-09 00:24:13',2,NULL,NULL),(2,'Startup Networking Night','Meet and connect with local startups and entrepreneurs.','2026-02-02 14:00:00','2026-02-18 18:00:00','2026-02-18 22:00:00',0,0,NULL,200,1,0,49,'PARTY','/assets/networking-night.jpg',2,2,'2026-01-09 00:24:13',8,NULL,NULL),(3,'Online Python Workshop','Hands-on Python workshop online.','2026-03-03 08:00:00','2026-03-15 10:00:00','2026-03-15 14:00:00',0,1,'https://zoom.us/j/123456789',100,0,0,19.99,'TECH','/assets/python-workshop.jpg',3,3,'2026-01-09 00:24:13',1,NULL,NULL),(4,'Musical Concert Tour 2026','','2026-01-09 12:58:06','2026-01-16 07:30:00','2026-01-16 11:30:00',0,0,NULL,0,0,0,0,NULL,'assets/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg',5,4,'2026-01-09 12:58:06',3,'USD',NULL),(5,'State of Platform Engineering in 2026: Salary, maturity, and shifting down','','2026-01-09 16:40:20','2026-01-30 11:30:00','2026-01-30 17:30:00',0,0,NULL,0,0,0,0,NULL,'/assets/userUploads/posters/196505bc-57d0-4410-9eec-c0ddba860b8c.webp',5,5,'2026-01-09 16:40:20',1,'USD',60),(6,'Musical Tour 2026','','2026-01-09 16:51:06','2026-01-08 23:30:00','2026-01-09 00:30:00',0,0,NULL,0,0,0,0,NULL,'assets/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg',5,6,'2026-01-09 16:51:06',3,'USD',60);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `script` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','Create user table','SQL','V1__Create_user_table.sql',1362813385,'root','2026-01-09 00:24:11',51,1),(2,'2','Create location table','SQL','V2__Create_location_table.sql',1489407924,'root','2026-01-09 00:24:12',1074,1),(3,'3','Create tag table','SQL','V3__Create_tag_table.sql',-987227703,'root','2026-01-09 00:24:12',39,1),(4,'4','Create event table','SQL','V4__Create_event_table.sql',-1539689155,'root','2026-01-09 00:24:12',84,1),(5,'5','Create participation table','SQL','V5__Create_participation_table.sql',-309645089,'root','2026-01-09 00:24:12',38,1),(6,'6','Insert sample data','SQL','V6__Insert_sample_data.sql',448106013,'root','2026-01-09 00:24:13',22,1),(7,'7','Create category entity','SQL','V7__Create_category_entity.sql',-1649823006,'root','2026-01-09 00:24:13',191,1),(8,'8','Seed continent and city','SQL','V8__Seed_continent_and_city.sql',-1266689399,'root','2026-01-09 00:28:43',405,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` float(10,8) DEFAULT NULL,
  `longitude` float(11,8) DEFAULT NULL,
  `timezone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `place_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_infos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_city` (`city`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Grand Conference Hall','123 Main St','New York','NY','USA','10001',40.71279907,-74.00599670,'America/New_York',NULL,'Building A, Floor 5','2026-01-09 00:24:12'),(2,'Tech Park Auditorium','456 Innovation Dr','San Francisco','CA','USA','94107',37.77489853,-122.41940308,'America/Los_Angeles',NULL,'Near Gate 3','2026-01-09 00:24:12'),(3,'Virtual Event Platform','Online','Virtual',NULL,'Online',NULL,NULL,NULL,'UTC',NULL,'Zoom/Meet platform','2026-01-09 00:24:12'),(4,'Amsterdam','North Holland, Netherlands','',NULL,'Netherlands','',52.37308121,4.89245319,'GMT+1',NULL,'','2026-01-09 12:58:06'),(5,'Amsterdam Public Library','Brink, Amsterdam, North Holland, Netherlands','Amsterdam',NULL,'Netherlands','1097 TV',52.33993530,4.94327497,'GMT+1',NULL,'','2026-01-09 16:40:20'),(6,'Concertgebouw','Concertgebouwplein, 2, Amsterdam, North Holland, Netherlands','Amsterdam',NULL,'Netherlands','1071LN',52.35619736,4.87904501,'GMT+1',NULL,'','2026-01-09 16:51:05');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb0yvoep4h4k92ipon31wmdf7e` (`user_id`),
  CONSTRAINT `FKb0yvoep4h4k92ipon31wmdf7e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participation`
--

DROP TABLE IF EXISTS `participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_event` (`user_id`,`event_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_event` (`event_id`),
  KEY `idx_status` (`status`),
  CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participation`
--

LOCK TABLES `participation` WRITE;
/*!40000 ALTER TABLE `participation` DISABLE KEYS */;
INSERT INTO `participation` VALUES (1,'CONFIRMED','2025-11-05 11:00:00',1,1),(2,'WAITING','2025-11-06 08:00:00',2,1),(3,'CONFIRMED','2025-11-07 13:00:00',3,2),(4,'PENDING','2025-11-08 09:00:00',4,3);
/*!40000 ALTER TABLE `participation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name` (`tag_name`),
  KEY `idx_name` (`tag_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'Tech','2026-01-09 00:24:12'),(2,'Networking','2026-01-09 00:24:12'),(3,'Workshop','2026-01-09 00:24:12'),(4,'Conference','2026-01-09 00:24:12'),(5,'Virtual','2026-01-09 00:24:12');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_events`
--

DROP TABLE IF EXISTS `tag_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_events` (
  `event_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`event_id`,`tag_id`),
  KEY `idx_event` (`event_id`),
  KEY `idx_tag` (`tag_id`),
  CONSTRAINT `tag_events_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tag_events_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_events`
--

LOCK TABLES `tag_events` WRITE;
/*!40000 ALTER TABLE `tag_events` DISABLE KEYS */;
INSERT INTO `tag_events` VALUES (1,1),(1,4),(2,2),(2,4),(3,3),(3,5);
/*!40000 ALTER TABLE `tag_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'LOCAL',
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `account_non_expired` tinyint(1) NOT NULL DEFAULT '1',
  `account_non_locked` tinyint(1) NOT NULL DEFAULT '1',
  `credentials_non_expired` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_account` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keycloak_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkedin_account` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `x_account` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_account` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_provider` (`provider`,`provider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Alice Johnson','alice@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','LOCAL',NULL,NULL,'https://randomuser.me/api/portraits/women/1.jpg',1,1,1,1,'2026-01-09 00:24:12','2026-01-09 00:24:12',NULL,NULL,'',NULL,NULL,NULL,NULL,NULL),(2,'Bob Smith','bob@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','LOCAL',NULL,NULL,'https://randomuser.me/api/portraits/men/2.jpg',1,1,1,1,'2026-01-09 00:24:12','2026-01-09 00:24:12',NULL,NULL,'',NULL,NULL,NULL,NULL,NULL),(3,'Charlie Davis','charlie@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','LOCAL',NULL,NULL,'https://randomuser.me/api/portraits/men/3.jpg',1,1,1,1,'2026-01-09 00:24:12','2026-01-09 00:24:12',NULL,NULL,'',NULL,NULL,NULL,NULL,NULL),(4,'Dana Lee','dana@example.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','LOCAL',NULL,NULL,'https://randomuser.me/api/portraits/women/4.jpg',1,1,1,1,'2026-01-09 00:24:12','2026-01-09 00:24:12',NULL,NULL,'',NULL,NULL,NULL,NULL,NULL),(5,'salwa','sssalwa.kh@gmail.com','oauth','OAUTH',NULL,NULL,'https://cdn-icons-png.flaticon.com/512/6780/6780628.png',1,1,1,1,'2026-01-09 12:56:33','2026-01-09 12:56:33',NULL,NULL,'9fb4e18b-af00-4ad8-a100-7dcce6ccc255',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_email_sup`
--

DROP TABLE IF EXISTS `user_email_sup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_email_sup` (
  `user_id` bigint NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `FKf88bj9sq2xvoqa98huqjohanq` (`user_id`),
  CONSTRAINT `FKf88bj9sq2xvoqa98huqjohanq` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_email_sup`
--

LOCK TABLES `user_email_sup` WRITE;
/*!40000 ALTER TABLE `user_email_sup` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_email_sup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'event-management'
--

--
-- Dumping routines for database 'event-management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-09 20:25:06
