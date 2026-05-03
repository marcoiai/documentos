-- MySQL dump 10.13  Distrib 8.4.8, for macos26.2 (arm64)
--
-- Host: 127.0.0.1    Database: documentos_app
-- ------------------------------------------------------
-- Server version	8.4.8

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
-- Table structure for table `documento_tipos`
--

DROP TABLE IF EXISTS `documento_tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento_tipos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cabecalho` text COLLATE utf8mb4_unicode_ci,
  `rodape` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documento_tipos_external_id_unique` (`external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento_tipos`
--

LOCK TABLES `documento_tipos` WRITE;
/*!40000 ALTER TABLE `documento_tipos` DISABLE KEYS */;
INSERT INTO `documento_tipos` VALUES (1,'tipo_api_test','Tipo API Test','Cab {{data}}','Rod {{data}}','2026-03-12 04:38:34','2026-03-12 04:38:34'),(2,'tipo_6','Termo de Rescisão do Contrato de Trabalho (TRCT)','','','2026-03-16 21:17:32','2026-03-16 21:17:32');
/*!40000 ALTER TABLE `documento_tipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secoes`
--

DROP TABLE IF EXISTS `secoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secoes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cabecalho` text COLLATE utf8mb4_unicode_ci,
  `rodape` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `secoes_external_id_unique` (`external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secoes`
--

LOCK TABLES `secoes` WRITE;
/*!40000 ALTER TABLE `secoes` DISABLE KEYS */;
INSERT INTO `secoes` VALUES (1,'sec_trct_empregador','Identificação do Empregador','','','2026-03-16 21:17:32','2026-03-16 21:17:32'),(2,'sec_trct_empregado','Identificação do Empregado','','','2026-03-16 21:17:32','2026-03-16 21:17:32'),(3,'sec_trct_contrato','Informações do Contrato','','','2026-03-16 21:17:32','2026-03-16 21:17:32'),(4,'sec_trct_valores','Valores devidos ao trabalhador','','','2026-03-16 21:28:08','2026-03-16 21:28:08');
/*!40000 ALTER TABLE `secoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atributos`
--

DROP TABLE IF EXISTS `atributos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atributos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secao_external_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_campo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'texto',
  `validador` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `peso` decimal(14,4) DEFAULT NULL,
  `mascara` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template_texto` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `atributos_external_id_unique` (`external_id`),
  KEY `atributos_tipo_external_id_index` (`tipo_external_id`),
  KEY `atributos_secao_external_id_index` (`secao_external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atributos`
--

LOCK TABLES `atributos` WRITE;
/*!40000 ALTER TABLE `atributos` DISABLE KEYS */;
INSERT INTO `atributos` VALUES (1,'atributo_nome_1773443775362','tipo_api_test',NULL,'Nome','texto',NULL,NULL,NULL,NULL,'2026-03-14 02:16:15','2026-03-14 02:16:15'),(2,'atributo_data_nascimento_1773443838761','tipo_api_test',NULL,'Data Nascimento','data','date',NULL,'99/99/9999',NULL,'2026-03-14 02:17:18','2026-03-14 02:17:18'),(3,'atributo_cpf_1773444087713','tipo_api_test',NULL,'CPF','texto',NULL,NULL,'999.999.999-99',NULL,'2026-03-14 02:21:27','2026-03-14 02:21:27'),(4,'att_18','tipo_6','sec_trct_empregador','Razão Social','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(5,'att_19','tipo_6','sec_trct_empregador','CNPJ','texto',NULL,NULL,'99.999.999/9999-99',NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(6,'att_20','tipo_6','sec_trct_empregador','Endereço','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(7,'att_21','tipo_6','sec_trct_empregador','CNAE','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(8,'att_22','tipo_6','sec_trct_empregado','Nome','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(9,'att_23','tipo_6','sec_trct_empregado','CPF','texto',NULL,NULL,'999.999.999-99',NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(10,'att_24','tipo_6','sec_trct_empregado','Data de Nascimento','data','date',NULL,'99/99/9999',NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(11,'att_25','tipo_6','sec_trct_empregado','Cargo','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(12,'att_28','tipo_6','sec_trct_empregado','CTPS (n / série)','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(13,'att_29','tipo_6','sec_trct_contrato','Tipo de contrato (CLT / prazo determinado)','texto',NULL,NULL,NULL,NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(14,'att_30','tipo_6','sec_trct_contrato','Data de admissão','data','date',NULL,'99/99/9999',NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(15,'att_31','tipo_6','sec_trct_contrato','Data de desligamento','data','date',NULL,'99/99/9999',NULL,'2026-03-16 21:17:32','2026-03-16 21:17:32'),(16,'att_32','tipo_6','sec_trct_valores','Saldo de salário','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(17,'att_33','tipo_6','sec_trct_valores','Aviso prévio','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(18,'att_34','tipo_6','sec_trct_valores','13º proporcional','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(19,'att_35','tipo_6','sec_trct_valores','Férias vencidas','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(20,'att_36','tipo_6','sec_trct_valores','Férias proporcionais','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(21,'att_37','tipo_6','sec_trct_valores','1/3 constitucional','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(22,'att_38','tipo_6','sec_trct_valores','Horas extras','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08'),(23,'att_39','tipo_6','sec_trct_valores','Adicionais','numero',NULL,NULL,NULL,NULL,'2026-03-16 21:28:08','2026-03-16 21:28:08');
/*!40000 ALTER TABLE `atributos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valores` json NOT NULL,
  `pdf_visivel` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentos_external_id_unique` (`external_id`),
  KEY `documentos_tipo_external_id_index` (`tipo_external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES (7,'documento_teste_1773443986146','tipo_api_test','Teste','{\"atributo_nome_1773443775362\": \"Marco\", \"atributo_data_nascimento_1773443838761\": \"1981-07-10\"}','{\"atributo_nome_1773443775362\": true, \"atributo_data_nascimento_1773443838761\": true}','2026-03-14 02:19:46','2026-03-14 02:19:46'),(8,'doc_10','tipo_6','Teste Novo Sindicato','{\"att_18\": \"Teste Razao\", \"att_19\": \"44.444.444/444-44\", \"att_20\": \"Rua Teste\", \"att_21\": \"11.9101\", \"att_22\": \"Marco\", \"att_23\": \"035.637.729-67\", \"att_24\": \"10/07/1981\", \"att_25\": \"Dev\", \"att_28\": \"324234324234\", \"att_29\": \"Tesest\", \"att_30\": \"10/01/2001\", \"att_31\": \"10/01/2005\"}','{\"att_18\": true, \"att_19\": true, \"att_20\": true, \"att_21\": true, \"att_22\": true, \"att_23\": true, \"att_24\": true, \"att_25\": true, \"att_28\": true, \"att_29\": true, \"att_30\": true, \"att_31\": true}','2026-03-14 03:20:32','2026-03-14 03:42:14'),(9,'doc_11','tipo_6','TESTE 2','{\"att_18\": \"Teste Razao\", \"att_19\": \"55.555.555/555-55\", \"att_20\": \"Rua Teste 2\", \"att_21\": \"11.9101\", \"att_22\": \"Marco 2\", \"att_23\": \"035.637.729-67\", \"att_24\": \"10/07/1981\", \"att_25\": \"Dev\", \"att_28\": \"324234324234\", \"att_29\": \"Tesest\", \"att_30\": \"10/01/2001\", \"att_31\": \"10/01/2005\"}','{\"att_18\": true, \"att_19\": true, \"att_20\": true, \"att_21\": true, \"att_22\": true, \"att_23\": true, \"att_24\": true, \"att_25\": true, \"att_28\": true, \"att_29\": true, \"att_30\": true, \"att_31\": true}','2026-03-14 03:25:21','2026-03-14 03:42:25');
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `layouts`
--

DROP TABLE IF EXISTS `layouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `layouts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tipo_external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `items` json DEFAULT NULL,
  `section_order` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `layouts_tipo_external_id_unique` (`tipo_external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `layouts`
--

LOCK TABLES `layouts` WRITE;
/*!40000 ALTER TABLE `layouts` DISABLE KEYS */;
INSERT INTO `layouts` VALUES (1,'tipo_6','[{\"attrId\": \"att_18\", \"colSpan\": 6}, {\"attrId\": \"att_19\", \"colSpan\": 6}, {\"attrId\": \"att_20\", \"colSpan\": 12}, {\"attrId\": \"att_21\", \"colSpan\": 6}, {\"attrId\": \"att_22\", \"colSpan\": 6}, {\"attrId\": \"att_23\", \"colSpan\": 6}, {\"attrId\": \"att_24\", \"colSpan\": 6}, {\"attrId\": \"att_25\", \"colSpan\": 6}, {\"attrId\": \"att_28\", \"colSpan\": 12}, {\"attrId\": \"att_29\", \"colSpan\": 12}, {\"attrId\": \"att_30\", \"colSpan\": 6}, {\"attrId\": \"att_31\", \"colSpan\": 6}, {\"attrId\": \"att_32\", \"colSpan\": 6}, {\"attrId\": \"att_33\", \"colSpan\": 6}, {\"attrId\": \"att_34\", \"colSpan\": 6}, {\"attrId\": \"att_35\", \"colSpan\": 6}, {\"attrId\": \"att_36\", \"colSpan\": 6}, {\"attrId\": \"att_37\", \"colSpan\": 6}, {\"attrId\": \"att_38\", \"colSpan\": 6}, {\"attrId\": \"att_39\", \"colSpan\": 6}]','[\"sec_trct_empregador\", \"sec_trct_empregado\", \"sec_trct_contrato\", \"sec_trct_valores\"]','2026-03-16 21:17:32','2026-03-16 21:28:08');
/*!40000 ALTER TABLE `layouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_configs`
--

DROP TABLE IF EXISTS `report_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_configs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_external_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `selected_attr_ids` json DEFAULT NULL,
  `report_layout` json DEFAULT NULL,
  `report_block_order` json DEFAULT NULL,
  `report_block_visibility` json DEFAULT NULL,
  `report_block_spacer_heights` json DEFAULT NULL,
  `report_block_images` json DEFAULT NULL,
  `report_footer_mode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `report_footer_anchor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_attr_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_operador` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_valor` text COLLATE utf8mb4_unicode_ci,
  `filtro_valor_de` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_valor_ate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_data_modo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_data_attr_de` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_data_attr_ate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filtro_data_intervalo_dias` int DEFAULT NULL,
  `somar_numericos` tinyint(1) NOT NULL DEFAULT '0',
  `total_attr_ids` json DEFAULT NULL,
  `ordenacao` json DEFAULT NULL,
  `ordenar_attr_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ordenar_direcao` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `report_configs_external_id_unique` (`external_id`),
  KEY `report_configs_tipo_external_id_index` (`tipo_external_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_configs`
--

LOCK TABLES `report_configs` WRITE;
/*!40000 ALTER TABLE `report_configs` DISABLE KEYS */;
INSERT INTO `report_configs` VALUES (1,'rptcfg_date_test','cfg date','tipo_1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'date_between',NULL,'2026-03-01','2026-03-31',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'2026-03-12 04:52:17','2026-03-12 04:52:17'),(2,'rptcfg_trct_recovery','TRCT Recuperado','tipo_6','[\"att_18\", \"att_19\", \"att_20\", \"att_21\", \"att_22\", \"att_23\", \"att_24\", \"att_25\", \"att_28\", \"att_29\", \"att_30\", \"att_31\", \"att_32\", \"att_33\", \"att_34\", \"att_35\", \"att_36\", \"att_37\", \"att_38\", \"att_39\"]','[{\"attrId\": \"att_18\", \"colSpan\": 6}, {\"attrId\": \"att_19\", \"colSpan\": 6}, {\"attrId\": \"att_20\", \"colSpan\": 12}, {\"attrId\": \"att_21\", \"colSpan\": 6}, {\"attrId\": \"att_22\", \"colSpan\": 6}, {\"attrId\": \"att_23\", \"colSpan\": 6}, {\"attrId\": \"att_24\", \"colSpan\": 6}, {\"attrId\": \"att_25\", \"colSpan\": 6}, {\"attrId\": \"att_28\", \"colSpan\": 12}, {\"attrId\": \"att_29\", \"colSpan\": 12}, {\"attrId\": \"att_30\", \"colSpan\": 6}, {\"attrId\": \"att_31\", \"colSpan\": 6}, {\"attrId\": \"att_32\", \"colSpan\": 6}, {\"attrId\": \"att_33\", \"colSpan\": 6}, {\"attrId\": \"att_34\", \"colSpan\": 6}, {\"attrId\": \"att_35\", \"colSpan\": 6}, {\"attrId\": \"att_36\", \"colSpan\": 6}, {\"attrId\": \"att_37\", \"colSpan\": 6}, {\"attrId\": \"att_38\", \"colSpan\": 6}, {\"attrId\": \"att_39\", \"colSpan\": 6}]','[\"cabecalho\", \"info_geracao\", \"tabela\", \"rodape\"]','{\"rodape\": true, \"tabela\": true, \"cabecalho\": true, \"info_geracao\": true}','{}','{}','fixed_bottom','tabela',NULL,'contains',NULL,NULL,NULL,'valor',NULL,NULL,0,0,'[]','[]',NULL,'asc','2026-03-16 21:24:22','2026-03-16 21:28:08');
/*!40000 ALTER TABLE `report_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_state_snapshots`
--

DROP TABLE IF EXISTS `app_state_snapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_state_snapshots` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `scope` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `payload` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_state_snapshots_scope_index` (`scope`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_state_snapshots`
--

LOCK TABLES `app_state_snapshots` WRITE;
/*!40000 ALTER TABLE `app_state_snapshots` DISABLE KEYS */;
INSERT INTO `app_state_snapshots` VALUES (1,'default','{\"tipos\": [{\"id\": \"tipo_1\", \"nome\": \"Atendimento\", \"rodape\": \"Este documento tem validade de 90 dias a partir de {{data}}\", \"cabecalho\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non ipsum sodales, malesuada nulla quis, pulvinar turpis. Nullam consectetur aliquam augue id lobortis.\"}, {\"id\": \"tipo_3\", \"nome\": \"Declaracao\", \"rodape\": \"RODAPE ## Este documento tem validade de 90 dias a partir de {{data}}\", \"cabecalho\": \"CABECALHO ## Sindicato SindBlu - Rua XV de Novembro, 475, Blumenau\"}, {\"id\": \"tipo_6\", \"nome\": \"Termo de Rescisão do Contrato de Trabalho (TRCT)\", \"rodape\": null, \"cabecalho\": null}], \"secoes\": [{\"id\": \"sec_1\", \"nome\": \"Dados Atendimento\", \"rodape\": null, \"cabecalho\": null}, {\"id\": \"sec_2\", \"nome\": \"Texto\", \"rodape\": null, \"cabecalho\": \"ola {{nome}}\"}, {\"id\": \"sec_3\", \"nome\": \"oeauoeauoae\", \"rodape\": null, \"cabecalho\": null}, {\"id\": \"sec_trct_empregador\", \"nome\": \"Identificação do Empregador\", \"rodape\": null, \"cabecalho\": null}, {\"id\": \"sec_trct_empregado\", \"nome\": \"Identificação do Empregado\", \"rodape\": null, \"cabecalho\": null}, {\"id\": \"sec_trct_contrato\", \"nome\": \"Informações do Contrato\", \"rodape\": null, \"cabecalho\": null}, {\"id\": \"sec_trct_valores\", \"nome\": \"Valores devidos ao trabalhador\", \"rodape\": null, \"cabecalho\": null}], \"layouts\": {\"tipo_1\": [{\"attrId\": \"att_1\", \"colSpan\": 3}, {\"attrId\": \"att_12\", \"colSpan\": 4}, {\"attrId\": \"att_13\", \"colSpan\": 4}, {\"attrId\": \"att_14\", \"colSpan\": 4}, {\"attrId\": \"att_16\", \"colSpan\": 6}, {\"attrId\": \"att_15\", \"colSpan\": 6}], \"tipo_3\": [{\"attrId\": \"att_6\", \"colSpan\": 12}, {\"attrId\": \"att_7\", \"colSpan\": 6}, {\"attrId\": \"att_8\", \"colSpan\": 6}, {\"attrId\": \"att_11\", \"colSpan\": 12}], \"tipo_6\": [{\"attrId\": \"att_18\", \"colSpan\": 6}, {\"attrId\": \"att_19\", \"colSpan\": 6}, {\"attrId\": \"att_20\", \"colSpan\": 12}, {\"attrId\": \"att_21\", \"colSpan\": 6}, {\"attrId\": \"att_22\", \"colSpan\": 6}, {\"attrId\": \"att_23\", \"colSpan\": 6}, {\"attrId\": \"att_24\", \"colSpan\": 6}, {\"attrId\": \"att_25\", \"colSpan\": 6}, {\"attrId\": \"att_28\", \"colSpan\": 12}, {\"attrId\": \"att_29\", \"colSpan\": 12}, {\"attrId\": \"att_30\", \"colSpan\": 6}, {\"attrId\": \"att_31\", \"colSpan\": 6}, {\"attrId\": \"att_32\", \"colSpan\": 6}, {\"attrId\": \"att_33\", \"colSpan\": 6}, {\"attrId\": \"att_34\", \"colSpan\": 6}, {\"attrId\": \"att_35\", \"colSpan\": 6}, {\"attrId\": \"att_36\", \"colSpan\": 6}, {\"attrId\": \"att_37\", \"colSpan\": 6}, {\"attrId\": \"att_38\", \"colSpan\": 6}, {\"attrId\": \"att_39\", \"colSpan\": 6}]}, \"atributos\": [{\"id\": \"att_1\", \"nome\": \"Nome\", \"peso\": null, \"tipoId\": \"tipo_1\", \"mascara\": null, \"secaoId\": \"sec_1\", \"tipoCampo\": \"texto\", \"validador\": \"required\", \"templateTexto\": null}, {\"id\": \"att_6\", \"nome\": \"Declaracao\", \"peso\": null, \"tipoId\": \"tipo_3\", \"mascara\": null, \"secaoId\": null, \"tipoCampo\": \"texto_placeholder\", \"validador\": null}, {\"id\": \"att_7\", \"nome\": \"Nome\", \"peso\": null, \"tipoId\": \"tipo_3\", \"mascara\": null, \"secaoId\": null, \"tipoCampo\": \"texto\", \"validador\": null}, {\"id\": \"att_8\", \"nome\": \"Endereco\", \"peso\": null, \"tipoId\": \"tipo_3\", \"mascara\": null, \"secaoId\": null, \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_11\", \"nome\": \"Assinatura\", \"peso\": null, \"tipoId\": \"tipo_3\", \"mascara\": null, \"secaoId\": null, \"tipoCampo\": \"assinatura\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_12\", \"nome\": \"CPF\", \"peso\": null, \"tipoId\": \"tipo_1\", \"mascara\": \"999.999.999-99\", \"secaoId\": \"sec_1\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_13\", \"nome\": \"Protocolo\", \"peso\": null, \"tipoId\": \"tipo_1\", \"mascara\": null, \"secaoId\": \"sec_1\", \"tipoCampo\": \"texto\", \"validador\": \"required\", \"templateTexto\": null}, {\"id\": \"att_14\", \"nome\": \"Valor\", \"peso\": null, \"tipoId\": \"tipo_1\", \"mascara\": null, \"secaoId\": \"sec_1\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_15\", \"nome\": \"Data Inicio\", \"peso\": null, \"tipoId\": \"tipo_1\", \"mascara\": null, \"secaoId\": null, \"tipoCampo\": \"data\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_16\", \"nome\": \"Data Fim\", \"peso\": null, \"tipoId\": \"tipo_1\", \"mascara\": null, \"secaoId\": null, \"tipoCampo\": \"data\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_18\", \"nome\": \"Razao Social\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_empregador\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_19\", \"nome\": \"CNPJ\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": \"99.999.999/9999-99\", \"secaoId\": \"sec_trct_empregador\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_20\", \"nome\": \"Endereco\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_empregador\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_21\", \"nome\": \"CNAE\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_empregador\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_22\", \"nome\": \"Nome\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_empregado\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_23\", \"nome\": \"CPF\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": \"999.999.999-99\", \"secaoId\": \"sec_trct_empregado\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_24\", \"nome\": \"Data de Nascimento\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": \"99/99/9999\", \"secaoId\": \"sec_trct_empregado\", \"tipoCampo\": \"data\", \"validador\": \"date\", \"templateTexto\": null}, {\"id\": \"att_25\", \"nome\": \"Cargo\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_empregado\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_28\", \"nome\": \"CTPS (n / serie)\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_empregado\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_29\", \"nome\": \"Tipo de contrato (CLT / prazo determinado)\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_contrato\", \"tipoCampo\": \"texto\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_30\", \"nome\": \"Data de admissao\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": \"99/99/9999\", \"secaoId\": \"sec_trct_contrato\", \"tipoCampo\": \"data\", \"validador\": \"date\", \"templateTexto\": null}, {\"id\": \"att_31\", \"nome\": \"Data de desligamento\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": \"99/99/9999\", \"secaoId\": \"sec_trct_contrato\", \"tipoCampo\": \"data\", \"validador\": \"date\", \"templateTexto\": null}, {\"id\": \"att_32\", \"nome\": \"Saldo de salário\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_33\", \"nome\": \"Aviso prévio\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_34\", \"nome\": \"13º proporcional\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_35\", \"nome\": \"Férias vencidas\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_36\", \"nome\": \"Férias proporcionais\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_37\", \"nome\": \"1/3 constitucional\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_38\", \"nome\": \"Horas extras\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}, {\"id\": \"att_39\", \"nome\": \"Adicionais\", \"peso\": null, \"tipoId\": \"tipo_6\", \"mascara\": null, \"secaoId\": \"sec_trct_valores\", \"tipoCampo\": \"numero\", \"validador\": null, \"templateTexto\": null}], \"documentos\": [{\"id\": \"doc_5\", \"tipoId\": \"tipo_1\", \"titulo\": \"Documento Teste Atendimento\", \"valores\": {\"att_1\": \"MARCO AURELIO SIMAO\", \"att_12\": \"344.444.444-44\", \"att_13\": \"32423423423\", \"att_14\": \"850\"}, \"pdfVisivel\": {\"att_1\": true, \"att_12\": true, \"att_13\": true, \"att_14\": true}}, {\"id\": \"doc_6\", \"tipoId\": \"tipo_3\", \"titulo\": \"Teste Decla\", \"valores\": {\"att_6\": \"Declaro que o {{nome}} e do endereco {{endereco}}.\", \"att_7\": \"Marco Aurelio Simao\", \"att_8\": \"Vila Lobos, 146\", \"att_11\": \"Marco\"}, \"pdfVisivel\": {\"att_6\": true, \"att_7\": false, \"att_8\": false, \"att_11\": true}}, {\"id\": \"doc_7\", \"tipoId\": \"tipo_1\", \"titulo\": \"Outro Atendimento\", \"valores\": {\"att_1\": \"MAR.CO .AUR-EL\", \"att_12\": \"667.555.555-55\", \"att_13\": \"32423423424\", \"att_14\": \"330\"}, \"pdfVisivel\": {\"att_1\": true, \"att_12\": true, \"att_13\": true, \"att_14\": true}}, {\"id\": \"doc_8\", \"tipoId\": \"tipo_1\", \"titulo\": \"Mais um Atendimento\", \"valores\": {\"att_1\": \"Outro Nome\", \"att_12\": \"354.612.309-78\", \"att_13\": \"32423423425\", \"att_14\": \"10\"}, \"pdfVisivel\": {\"att_1\": true, \"att_12\": true, \"att_13\": true, \"att_14\": true}}, {\"id\": \"doc_9\", \"tipoId\": \"tipo_1\", \"titulo\": \"Teste Valor mysql\", \"valores\": {\"att_1\": \"MARCO AURELIO SIMAO\", \"att_12\": \"344.444.444-44\", \"att_13\": \"32423423423\", \"att_14\": \"3\", \"att_15\": \"2026-03-11\", \"att_16\": \"2026-03-26\"}, \"pdfVisivel\": {\"att_1\": true, \"att_12\": true, \"att_13\": true, \"att_14\": true, \"att_15\": true, \"att_16\": true}}, {\"id\": \"doc_10\", \"tipoId\": \"tipo_6\", \"titulo\": \"Teste Novo Sindicato\", \"valores\": {\"att_18\": \"Teste Razao\", \"att_19\": \"44.444.444/444-44\", \"att_20\": \"Rua Teste\", \"att_21\": \"11.9101\", \"att_22\": \"Marco\", \"att_23\": \"035.637.729-67\", \"att_24\": \"10/07/1981\", \"att_25\": \"Dev\", \"att_28\": \"324234324234\", \"att_29\": \"Tesest\", \"att_30\": \"10/01/2001\", \"att_31\": \"10/01/2005\"}, \"pdfVisivel\": {\"att_18\": true, \"att_19\": true, \"att_20\": true, \"att_21\": true, \"att_22\": true, \"att_23\": true, \"att_24\": true, \"att_25\": true, \"att_28\": true, \"att_29\": true, \"att_30\": true, \"att_31\": true}}, {\"id\": \"doc_11\", \"tipoId\": \"tipo_6\", \"titulo\": \"TESTE 2\", \"valores\": {\"att_18\": \"Teste Razao\", \"att_19\": \"55.555.555/555-55\", \"att_20\": \"Rua Teste 2\", \"att_21\": \"11.9101\", \"att_22\": \"Marco 2\", \"att_23\": \"035.637.729-67\", \"att_24\": \"10/07/1981\", \"att_25\": \"Dev\", \"att_28\": \"324234324234\", \"att_29\": \"Tesest\", \"att_30\": \"10/01/2001\", \"att_31\": \"10/01/2005\"}, \"pdfVisivel\": {\"att_18\": true, \"att_19\": true, \"att_20\": true, \"att_21\": true, \"att_22\": true, \"att_23\": true, \"att_24\": true, \"att_25\": true, \"att_28\": true, \"att_29\": true, \"att_30\": true, \"att_31\": true}}], \"tipoSecoes\": {\"tipo_1\": [\"sec_1\"], \"tipo_3\": [], \"tipo_6\": [\"sec_trct_empregador\", \"sec_trct_empregado\", \"sec_trct_contrato\", \"sec_trct_valores\"]}, \"tipoCounter\": 7, \"secaoCounter\": 7, \"reportConfigs\": [{\"id\": \"rptcfg_1773267621231_q3kxwo\", \"nome\": \"relatorio_anual\", \"tipoId\": \"tipo_1\", \"createdAt\": \"2026-03-12T01:38:02.405Z\", \"ordenacao\": [], \"filtroValor\": null, \"filtroAttrId\": null, \"reportLayout\": [{\"attrId\": \"att_1\", \"colSpan\": 6}, {\"attrId\": \"att_13\", \"colSpan\": 6}, {\"attrId\": \"att_12\", \"colSpan\": 6}, {\"attrId\": \"att_14\", \"colSpan\": 6}], \"totalAttrIds\": [\"att_14\"], \"incluirRodape\": false, \"ordenarAttrId\": null, \"filtroOperador\": \"contains\", \"ordenarDirecao\": \"asc\", \"somarNumericos\": true, \"selectedAttrIds\": [\"att_1\", \"att_12\", \"att_13\", \"att_14\", \"att_15\", \"att_16\"], \"incluirCabecalho\": false, \"reportBlockOrder\": [\"info_geracao\", \"cabecalho\", \"tabela\", \"rodape\"], \"reportFooterMode\": \"fixed_bottom\", \"reportFooterAnchor\": \"tabela\", \"reportBlockVisibility\": {\"rodape\": true, \"tabela\": true, \"cabecalho\": false, \"info_geracao\": true}, \"reportBlockSpacerHeights\": []}, {\"id\": \"rptcfg_1773267658913_d4o34y\", \"nome\": \"relatorio_anual_no_cpf\", \"tipoId\": \"tipo_1\", \"createdAt\": \"2026-03-11T22:20:58.913Z\", \"ordenacao\": [], \"filtroValor\": null, \"filtroAttrId\": null, \"reportLayout\": [], \"totalAttrIds\": [], \"incluirRodape\": false, \"ordenarAttrId\": null, \"filtroOperador\": \"contains\", \"ordenarDirecao\": \"asc\", \"somarNumericos\": false, \"selectedAttrIds\": [\"att_1\", \"att_13\"], \"incluirCabecalho\": false, \"reportBlockOrder\": [\"cabecalho\", \"info_geracao\", \"tabela\", \"rodape\"], \"reportFooterMode\": \"fixed_bottom\", \"reportFooterAnchor\": \"tabela\", \"reportBlockVisibility\": {\"rodape\": true, \"tabela\": true, \"cabecalho\": true, \"info_geracao\": true}, \"reportBlockSpacerHeights\": []}, {\"id\": \"rptcfg_1773267762527_sv531s\", \"nome\": \"teste\", \"tipoId\": \"tipo_1\", \"createdAt\": \"2026-03-11T22:22:42.527Z\", \"ordenacao\": [], \"filtroValor\": null, \"filtroAttrId\": null, \"reportLayout\": [{\"attrId\": \"att_1\", \"colSpan\": 6}, {\"attrId\": \"att_12\", \"colSpan\": 6}, {\"attrId\": \"att_13\", \"colSpan\": 6}], \"totalAttrIds\": [], \"incluirRodape\": false, \"ordenarAttrId\": null, \"filtroOperador\": \"contains\", \"ordenarDirecao\": \"asc\", \"somarNumericos\": false, \"selectedAttrIds\": [\"att_1\", \"att_12\", \"att_13\"], \"incluirCabecalho\": false, \"reportBlockOrder\": [\"cabecalho\", \"info_geracao\", \"tabela\", \"rodape\"], \"reportFooterMode\": \"fixed_bottom\", \"reportFooterAnchor\": \"tabela\", \"reportBlockVisibility\": {\"rodape\": true, \"tabela\": true, \"cabecalho\": true, \"info_geracao\": true}, \"reportBlockSpacerHeights\": []}, {\"id\": \"rptcfg_1773268044504_yag8dg\", \"nome\": \"a\", \"tipoId\": \"tipo_1\", \"createdAt\": \"2026-03-11T22:27:24.504Z\", \"ordenacao\": [], \"filtroValor\": null, \"filtroAttrId\": null, \"reportLayout\": [], \"totalAttrIds\": [], \"incluirRodape\": false, \"ordenarAttrId\": null, \"filtroOperador\": \"contains\", \"ordenarDirecao\": \"asc\", \"somarNumericos\": false, \"selectedAttrIds\": [\"att_1\", \"att_12\", \"att_13\"], \"incluirCabecalho\": false, \"reportBlockOrder\": [\"cabecalho\", \"info_geracao\", \"tabela\", \"rodape\"], \"reportFooterMode\": \"fixed_bottom\", \"reportFooterAnchor\": \"tabela\", \"reportBlockVisibility\": {\"rodape\": true, \"tabela\": true, \"cabecalho\": true, \"info_geracao\": true}, \"reportBlockSpacerHeights\": []}, {\"id\": \"rptcfg_1773271807203_subqac\", \"nome\": \"atendimento\", \"tipoId\": \"tipo_1\", \"createdAt\": \"2026-03-11T23:30:07.203Z\", \"ordenacao\": [], \"filtroValor\": null, \"filtroAttrId\": null, \"reportLayout\": [], \"totalAttrIds\": [], \"incluirRodape\": true, \"ordenarAttrId\": null, \"filtroOperador\": \"contains\", \"ordenarDirecao\": \"asc\", \"somarNumericos\": false, \"selectedAttrIds\": [\"att_1\", \"att_12\", \"att_13\", \"att_14\"], \"incluirCabecalho\": true, \"reportBlockOrder\": [\"cabecalho\", \"info_geracao\", \"tabela\", \"rodape\"], \"reportFooterMode\": \"fixed_bottom\", \"reportFooterAnchor\": \"tabela\", \"reportBlockVisibility\": {\"rodape\": true, \"tabela\": true, \"cabecalho\": true, \"info_geracao\": true}, \"reportBlockSpacerHeights\": []}, {\"id\": \"rptcfg_trct_recovery\", \"nome\": \"TRCT Recuperado\", \"tipoId\": \"tipo_6\", \"createdAt\": \"2026-03-16T21:00:00.000Z\", \"ordenacao\": [], \"filtroValor\": null, \"filtroAttrId\": null, \"reportLayout\": [{\"attrId\": \"att_18\", \"colSpan\": 6}, {\"attrId\": \"att_19\", \"colSpan\": 6}, {\"attrId\": \"att_20\", \"colSpan\": 12}, {\"attrId\": \"att_21\", \"colSpan\": 6}, {\"attrId\": \"att_22\", \"colSpan\": 6}, {\"attrId\": \"att_23\", \"colSpan\": 6}, {\"attrId\": \"att_24\", \"colSpan\": 6}, {\"attrId\": \"att_25\", \"colSpan\": 6}, {\"attrId\": \"att_28\", \"colSpan\": 12}, {\"attrId\": \"att_29\", \"colSpan\": 12}, {\"attrId\": \"att_30\", \"colSpan\": 6}, {\"attrId\": \"att_31\", \"colSpan\": 6}, {\"attrId\": \"att_32\", \"colSpan\": 6}, {\"attrId\": \"att_33\", \"colSpan\": 6}, {\"attrId\": \"att_34\", \"colSpan\": 6}, {\"attrId\": \"att_35\", \"colSpan\": 6}, {\"attrId\": \"att_36\", \"colSpan\": 6}, {\"attrId\": \"att_37\", \"colSpan\": 6}, {\"attrId\": \"att_38\", \"colSpan\": 6}, {\"attrId\": \"att_39\", \"colSpan\": 6}], \"totalAttrIds\": [], \"totalFilters\": [], \"incluirRodape\": true, \"ordenarAttrId\": null, \"filtroOperador\": \"contains\", \"ordenarDirecao\": \"asc\", \"somarNumericos\": false, \"selectedAttrIds\": [\"att_18\", \"att_19\", \"att_20\", \"att_21\", \"att_22\", \"att_23\", \"att_24\", \"att_25\", \"att_28\", \"att_29\", \"att_30\", \"att_31\", \"att_32\", \"att_33\", \"att_34\", \"att_35\", \"att_36\", \"att_37\", \"att_38\", \"att_39\"], \"incluirCabecalho\": true, \"reportBlockOrder\": [\"cabecalho\", \"info_geracao\", \"tabela\", \"rodape\"], \"reportFooterMode\": \"fixed_bottom\", \"sumOfSumsAttrIds\": [], \"sumOfSumsEnabled\": false, \"reportFooterAnchor\": \"tabela\", \"reportBlockVisibility\": {\"rodape\": true, \"tabela\": true, \"cabecalho\": true, \"info_geracao\": true}, \"reportBlockSpacerHeights\": []}], \"layoutSections\": {\"tipo_1\": [\"__sem_secao__\", \"sec_1\"], \"tipo_3\": [\"__sem_secao__\"], \"tipo_6\": [\"__sem_secao__\", \"sec_trct_empregador\", \"sec_trct_empregado\", \"sec_trct_contrato\", \"sec_trct_valores\"]}, \"atributoCounter\": 40, \"documentoCounter\": 12}','2026-03-12 04:34:04','2026-03-17 00:31:08');
/*!40000 ALTER TABLE `app_state_snapshots` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-16 18:32:13
