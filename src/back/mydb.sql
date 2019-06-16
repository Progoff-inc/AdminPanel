-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 19 2019 г., 22:11
-- Версия сервера: 10.1.37-MariaDB
-- Версия PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mydb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

CREATE TABLE `authors` (
  `id_authors` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `catalog_of_solids`
--

CREATE TABLE `catalog_of_solids` (
  `id_сatalog_of_solids` smallint(5) UNSIGNED NOT NULL,
  `id_solids` smallint(5) UNSIGNED NOT NULL,
  `id_growing` smallint(5) UNSIGNED NOT NULL,
  `date_of_delivery` date NOT NULL,
  `hyper_attributes` varchar(1000) DEFAULT NULL,
  `foto_of_solid` blob,
  `foto_of_range` blob,
  `hyper_range` varchar(1000) DEFAULT NULL,
  `comments` text,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `crochet`
--

CREATE TABLE `crochet` (
  `id_crochet` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `second_name` varchar(45) DEFAULT NULL,
  `work_place` varchar(100) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `rank` varchar(45) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `experiments`
--

CREATE TABLE `experiments` (
  `id_experiment` smallint(5) UNSIGNED NOT NULL,
  `id_solid` smallint(5) UNSIGNED NOT NULL,
  `conditions` varchar(100) NOT NULL,
  `range` varchar(100) DEFAULT NULL,
  `table_of_frequency` varchar(100) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `exp_inv`
--

CREATE TABLE `exp_inv` (
  `id_exp` smallint(5) UNSIGNED NOT NULL,
  `id_inv` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `growing`
--

CREATE TABLE `growing` (
  `id_growing` smallint(5) UNSIGNED NOT NULL,
  `id_crochet` smallint(5) UNSIGNED NOT NULL,
  `id_method` smallint(5) UNSIGNED NOT NULL,
  `comment` text,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `invetory`
--

CREATE TABLE `invetory` (
  `id_inventory` smallint(5) UNSIGNED NOT NULL,
  `type` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `date_of_issue` date DEFAULT NULL,
  `value` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `technical_documentation` enum('Да','Нет') DEFAULT NULL,
  `information` varchar(100) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `method`
--

CREATE TABLE `method` (
  `id_method` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `periodicals`
--

CREATE TABLE `periodicals` (
  `id_periodicals` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `type` enum('Книга','Статья','Журнал') NOT NULL,
  `publishing_house` varchar(50) NOT NULL,
  `cipher` varchar(70) DEFAULT NULL,
  `year` year(4) NOT NULL,
  `value` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `tom` tinyint(3) UNSIGNED DEFAULT NULL,
  `num/part` tinyint(3) UNSIGNED DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `hyper_text` text,
  `information` text,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `periodicals_catalog`
--

CREATE TABLE `periodicals_catalog` (
  `id_period` smallint(5) UNSIGNED NOT NULL,
  `id_solid` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `periodic_author`
--

CREATE TABLE `periodic_author` (
  `id_Periodic` smallint(5) UNSIGNED NOT NULL,
  `id_author` smallint(5) UNSIGNED NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- --------------------------------------------------------

--
-- Структура таблицы `solids`
--

CREATE TABLE `solids` (
  `id_solids` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `formulae` varchar(45) NOT NULL,
  `id_type` enum('Стекло','Кристалл') NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id_authors`);

--
-- Индексы таблицы `catalog_of_solids`
--
ALTER TABLE `catalog_of_solids`
  ADD PRIMARY KEY (`id_сatalog_of_solids`),
  ADD KEY `fk_solids_idx` (`id_solids`),
  ADD KEY `fk_growing_idx` (`id_growing`);

--
-- Индексы таблицы `crochet`
--
ALTER TABLE `crochet`
  ADD PRIMARY KEY (`id_crochet`);

--
-- Индексы таблицы `experiments`
--
ALTER TABLE `experiments`
  ADD PRIMARY KEY (`id_experiment`),
  ADD KEY `fk_solid_idx` (`id_solid`);

--
-- Индексы таблицы `exp_inv`
--
ALTER TABLE `exp_inv`
  ADD KEY `fk_experiments_idx` (`id_exp`),
  ADD KEY `fk_inventory_idx` (`id_inv`);

--
-- Индексы таблицы `growing`
--
ALTER TABLE `growing`
  ADD PRIMARY KEY (`id_growing`),
  ADD KEY `fk_crochet_idx` (`id_crochet`),
  ADD KEY `fk_method_idx` (`id_method`);

--
-- Индексы таблицы `invetory`
--
ALTER TABLE `invetory`
  ADD PRIMARY KEY (`id_inventory`);

--
-- Индексы таблицы `method`
--
ALTER TABLE `method`
  ADD PRIMARY KEY (`id_method`);

--
-- Индексы таблицы `periodicals`
--
ALTER TABLE `periodicals`
  ADD PRIMARY KEY (`id_periodicals`);

--
-- Индексы таблицы `periodicals_catalog`
--
ALTER TABLE `periodicals_catalog`
  ADD PRIMARY KEY (`id_period`,`id_solid`),
  ADD KEY `fk_period_solids_2` (`id_solid`);

--
-- Индексы таблицы `periodic_author`
--
ALTER TABLE `periodic_author`
  ADD KEY `fk_period_idx` (`id_Periodic`),
  ADD KEY `fk_author_idx` (`id_author`);

--
-- Индексы таблицы `solids`
--
ALTER TABLE `solids`
  ADD PRIMARY KEY (`id_solids`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authors`
--
ALTER TABLE `authors`
  MODIFY `id_authors` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `catalog_of_solids`
--
ALTER TABLE `catalog_of_solids`
  MODIFY `id_сatalog_of_solids` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `crochet`
--
ALTER TABLE `crochet`
  MODIFY `id_crochet` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `experiments`
--
ALTER TABLE `experiments`
  MODIFY `id_experiment` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `growing`
--
ALTER TABLE `growing`
  MODIFY `id_growing` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `invetory`
--
ALTER TABLE `invetory`
  MODIFY `id_inventory` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `periodicals`
--
ALTER TABLE `periodicals`
  MODIFY `id_periodicals` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `solids`
--
ALTER TABLE `solids`
  MODIFY `id_solids` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `catalog_of_solids`
--
ALTER TABLE `catalog_of_solids`
  ADD CONSTRAINT `fk_growing` FOREIGN KEY (`id_growing`) REFERENCES `growing` (`id_growing`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_solids` FOREIGN KEY (`id_solids`) REFERENCES `solids` (`id_solids`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `experiments`
--
ALTER TABLE `experiments`
  ADD CONSTRAINT `fk_solid` FOREIGN KEY (`id_solid`) REFERENCES `catalog_of_solids` (`id_сatalog_of_solids`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `exp_inv`
--
ALTER TABLE `exp_inv`
  ADD CONSTRAINT `fk_experiments` FOREIGN KEY (`id_exp`) REFERENCES `experiments` (`id_experiment`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inventory` FOREIGN KEY (`id_inv`) REFERENCES `invetory` (`id_inventory`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `growing`
--
ALTER TABLE `growing`
  ADD CONSTRAINT `fk_crochet` FOREIGN KEY (`id_crochet`) REFERENCES `crochet` (`id_crochet`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_method` FOREIGN KEY (`id_method`) REFERENCES `method` (`id_method`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `periodicals_catalog`
--
ALTER TABLE `periodicals_catalog`
  ADD CONSTRAINT `fk_period_solids_1` FOREIGN KEY (`id_period`) REFERENCES `periodicals` (`id_periodicals`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_period_solids_2` FOREIGN KEY (`id_solid`) REFERENCES `solids` (`id_solids`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `periodic_author`
--
ALTER TABLE `periodic_author`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id_authors`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_period` FOREIGN KEY (`id_Periodic`) REFERENCES `periodicals` (`id_periodicals`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
