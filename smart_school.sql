-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: smart_school
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_classes`
--

DROP TABLE IF EXISTS `tbl_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_number` int(11) NOT NULL CHECK (`class_number` between 1 and 12),
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_number` (`class_number`)
) ENGINE=InnoDB AUTO_INCREMENT=1741 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_classes`
--

LOCK TABLES `tbl_classes` WRITE;
/*!40000 ALTER TABLE `tbl_classes` DISABLE KEYS */;
INSERT INTO `tbl_classes` VALUES (1,1,'Class 1','2025-11-18 09:13:55'),(2,2,'Class 2','2025-11-18 09:13:55'),(3,3,'Class 3','2025-11-18 09:13:55'),(4,4,'Class 4','2025-11-18 09:13:55'),(5,5,'Class 5','2025-11-18 09:13:55'),(6,6,'Class 6','2025-11-18 09:13:55'),(7,7,'Class 7','2025-11-18 09:13:55'),(8,8,'Class 8','2025-11-18 09:13:55'),(9,9,'Class 9','2025-11-18 09:13:55'),(10,10,'Class 10','2025-11-18 09:13:55'),(11,11,'Class 11','2025-11-18 09:13:55'),(12,12,'Class 12','2025-11-18 09:13:55');
/*!40000 ALTER TABLE `tbl_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_courses`
--

DROP TABLE IF EXISTS `tbl_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `course_details` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `course_time_length` varchar(100) DEFAULT NULL,
  `course_price` decimal(10,2) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `max_students` int(11) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `course_category` varchar(50) NOT NULL,
  `course_duration` varchar(100) DEFAULT NULL,
  `course_level` varchar(50) DEFAULT NULL,
  `course_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_code` (`course_code`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `tbl_courses_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_courses`
--

LOCK TABLES `tbl_courses` WRITE;
/*!40000 ALTER TABLE `tbl_courses` DISABLE KEYS */;
INSERT INTO `tbl_courses` VALUES (1,'Physics','PHY101','Intro to basic physics','2025-11-20','60 Hours',50000.00,3,30,'5434567898','science','3 Months','Beginner','/uploads/course_images/course-1763548079571-90431727.jpg','2025-11-19 10:27:59','2025-11-19 10:34:28'),(2,'Mern Stack','001','Mernstack Developer','2025-11-25','4',10000.00,4,10,'9432345412','commerce','10 months','medium','/uploads/course_images/course-1764063168287-813129979.png','2025-11-25 09:32:48','2025-11-25 09:46:16');
/*!40000 ALTER TABLE `tbl_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_holidays`
--

DROP TABLE IF EXISTS `tbl_holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_holidays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `holiday_type` enum('Public','By School') NOT NULL,
  `location` enum('Global','School') NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tbl_holidays_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_holidays`
--

LOCK TABLES `tbl_holidays` WRITE;
/*!40000 ALTER TABLE `tbl_holidays` DISABLE KEYS */;
INSERT INTO `tbl_holidays` VALUES (1,'Christmas Holiday','2025-12-24','2025-12-27','Extended Christmas holiday for all staff and students','Public','School',1,'2025-11-18 09:05:55','2025-11-18 09:08:35'),(2,'Free Monday','2025-12-01','2025-12-01','Free Monday','By School','School',5,'2025-11-25 10:06:07','2025-11-25 10:06:07');
/*!40000 ALTER TABLE `tbl_holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_leaves`
--

DROP TABLE IF EXISTS `tbl_leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_leaves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `leave_type` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `rejection_reason` text DEFAULT NULL,
  `total_days` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_leaves`
--

LOCK TABLES `tbl_leaves` WRITE;
/*!40000 ALTER TABLE `tbl_leaves` DISABLE KEYS */;
INSERT INTO `tbl_leaves` VALUES (1,2,'Medical Leave','2025-11-20','2025-11-22','Fever and rest recommended by doctor','approved',NULL,3,2,1,'2025-11-17 10:04:36','2025-11-17 10:15:39');
/*!40000 ALTER TABLE `tbl_leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_lectures`
--

DROP TABLE IF EXISTS `tbl_lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_lectures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `duration` int(11) NOT NULL COMMENT 'Duration in minutes',
  `location` varchar(255) DEFAULT NULL,
  `status` enum('confirmed','cancelled') DEFAULT 'confirmed',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tbl_lectures_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `tbl_subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_lectures_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_lectures`
--

LOCK TABLES `tbl_lectures` WRITE;
/*!40000 ALTER TABLE `tbl_lectures` DISABLE KEYS */;
INSERT INTO `tbl_lectures` VALUES (1,1,'2025-11-20','10:00:00',90,'Room 101','confirmed',3,'2025-11-18 08:28:34','2025-11-18 08:37:19',0),(2,1,'2025-11-25','09:00:00',120,'Room21','cancelled',4,'2025-11-25 10:36:36','2025-11-25 10:39:54',5);
/*!40000 ALTER TABLE `tbl_lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_library_assets`
--

DROP TABLE IF EXISTS `tbl_library_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_library_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL,
  `asset_type` enum('Book','CD','DVD','Newspaper') NOT NULL,
  `due_date` date DEFAULT NULL,
  `shelf_location` varchar(255) DEFAULT NULL,
  `status` enum('available','borrowed','damaged','lost') DEFAULT 'available',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tbl_library_assets_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `tbl_subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_library_assets_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_library_assets`
--

LOCK TABLES `tbl_library_assets` WRITE;
/*!40000 ALTER TABLE `tbl_library_assets` DISABLE KEYS */;
INSERT INTO `tbl_library_assets` VALUES (1,'Clean Code',1,'2025-11-10','Book','2025-12-25','B3-09','borrowed',1,'2025-11-18 08:49:23','2025-11-18 08:58:13');
/*!40000 ALTER TABLE `tbl_library_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_student_classes`
--

DROP TABLE IF EXISTS `tbl_student_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_student_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_student_class` (`student_id`,`class_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `tbl_student_classes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_student_classes_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `tbl_classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_student_classes`
--

LOCK TABLES `tbl_student_classes` WRITE;
/*!40000 ALTER TABLE `tbl_student_classes` DISABLE KEYS */;
INSERT INTO `tbl_student_classes` VALUES (1,2,2,'2025-11-18 09:24:19');
/*!40000 ALTER TABLE `tbl_student_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_subject_classes`
--

DROP TABLE IF EXISTS `tbl_subject_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_subject_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_subject_class` (`subject_id`,`class_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `tbl_subject_classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `tbl_subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_subject_classes_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `tbl_classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_subject_classes`
--

LOCK TABLES `tbl_subject_classes` WRITE;
/*!40000 ALTER TABLE `tbl_subject_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_subject_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_subjects`
--

DROP TABLE IF EXISTS `tbl_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  KEY `fk_subjects_class_id` (`class_id`),
  CONSTRAINT `fk_subjects_class_id` FOREIGN KEY (`class_id`) REFERENCES `tbl_classes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tbl_subjects_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_subjects_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `tbl_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_subjects`
--

LOCK TABLES `tbl_subjects` WRITE;
/*!40000 ALTER TABLE `tbl_subjects` DISABLE KEYS */;
INSERT INTO `tbl_subjects` VALUES (1,'Mathematics','Core subject covering algebra, geometry, calculus and others.',1,1,'2025-11-17 09:28:36','2025-11-17 09:35:01',NULL),(3,'Mathematic','sd',4,4,'2025-11-25 10:48:50','2025-11-25 10:57:35',NULL),(4,'Science','Science',4,4,'2025-11-25 10:49:02','2025-11-25 10:57:27',NULL);
/*!40000 ALTER TABLE `tbl_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_teacher_details`
--

DROP TABLE IF EXISTS `tbl_teacher_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_teacher_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `education` text DEFAULT NULL,
  `experience` text DEFAULT NULL,
  `conferences_courses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conferences_courses`)),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_teacher_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_teacher_details`
--

LOCK TABLES `tbl_teacher_details` WRITE;
/*!40000 ALTER TABLE `tbl_teacher_details` DISABLE KEYS */;
INSERT INTO `tbl_teacher_details` VALUES (1,6,'Pursuing Bsc IT','2','[]'),(2,3,'BCA',NULL,NULL);
/*!40000 ALTER TABLE `tbl_teacher_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','teacher','admin') NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'Sumit Admin','admin@example.com','$2b$10$iy9.3Aeh5EhMhBPa0H.0duFw4cEeZWyqmOYHrKSx3n52qacr1X8.6','admin','https://example.com/profile.jpg','Ahmedabad','9876543210','Gujarat, India','System administrator managing portal access','2025-11-17 09:01:16','2025-11-17 09:01:16'),(2,'Sumit Student','student@example.com','$2b$10$kvHXUuafCnYH1kqc3zxr/OH6kM2WRRnRFsrEKecXepXS/4V4i/Fmq','student','https://example.com/profile.jpg','Ahmedabad','9876547701','Gujarat, India','I am student','2025-11-17 09:59:03','2025-11-17 09:59:03'),(3,'Sumit Teacher','teacher@example.com','$2b$10$NQca3oFT/PMl/ovIfVj9w.ZASF4ulgaYCtxZ.fnBmpLOCRlmVUKFy','teacher','profile_image-1763453182809-41710427.avif','Ahmedabad','6634215423','Gujrat India','I am teacher','2025-11-18 08:06:22','2025-11-18 08:06:22'),(4,'Vihan','vihan@gmail.com','$2b$10$zQ6mBIeB2Fb10vcmGsDxxurWNe8npFwk995uGN6o/TgZP77tyOjxm','teacher','profile_image-1763972744593-728588259.webp','01, Madhur Avenue, Naranpura','4422753494','Navarang Circle, Navarangpura','I am a Teacher','2025-11-24 08:25:44','2025-11-24 08:25:44'),(5,'sumitt','sumitchaudhary9409@gmail.com','$2b$10$acNP.plxmZZDN5Um9hN/PuuppPzizzQp1NwnPzavQuGkARFZoQVIa','admin','profile_image-1763976919218-509526836.avif','01, Madhur Avenue, Naranpura','4422753494','Navarang Circle, Navarangpura','I am admin','2025-11-24 09:35:19','2025-11-24 09:35:19'),(6,'Arshav','arshav@gmail.com','$2b$10$cRyL3I3AUBbTfc3Y8UaX/OF2vzJhUxldl/E3aDnBfJGn.78SH9ynu','teacher','profile_image-1764060331225-280789624.avif','01, Madhur Avenue, Naranpura','4422753494','Navarang Circle, Navarangpura','I am Arshav','2025-11-25 08:45:31','2025-11-25 08:45:31'),(7,'Rutvik','rutvik@gmail.com','$2b$10$kbFoB3PXwYDfFJRr.xLUge6DvsVmi2uYkMICgXhCUFU.wXDUtVkPy','student','profile_image-1764061300919-219720776.webp','01, Madhur Avenue, Naranpura','6634215423','Navarang Circle, Navarangpura','Hello','2025-11-25 09:01:41','2025-11-25 09:08:32');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 10:20:48
