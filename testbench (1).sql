-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Lun 03 Avril 2017 à 10:36
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `testbench`
--

-- --------------------------------------------------------

--
-- Structure de la table `dictionaries`
--

CREATE TABLE `dictionaries` (
  `id` int(11) NOT NULL,
  `symbol_name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `pressed_val_freq` varchar(255) NOT NULL,
  `released_val_freq` varchar(255) NOT NULL,
  `pressed_val_tens` varchar(255) NOT NULL,
  `released_val_tens` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photo_link` varchar(255) NOT NULL,
  `can_id` varchar(255) NOT NULL,
  `family_id` varchar(255) NOT NULL,
  `timer` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `dictionaries`
--

INSERT INTO `dictionaries` (`id`, `symbol_name`, `type`, `value`, `pressed_val_freq`, `released_val_freq`, `pressed_val_tens`, `released_val_tens`, `description`, `photo_link`, `can_id`, `family_id`, `timer`) VALUES
(1, 'II20', 'button', '', '8b', '0b', '8b', '0b', 'Pref', 'tsui1/bt1.jpg', '000002ad', '1', 0),
(2, 'II19', 'button', '', '88', '08', '88', '08', 'Sub', 'tsui1/bt2.jpg', '000002ad', '1', 0),
(3, 'II18', 'button', '', '89', '09', '89', '09', 'N/L', 'tsui1/bt3.jpg', '000002ad', '1', 0),
(4, 'II17', 'button', '', '8a', '0a', '8a', '0a', 'Store', 'tsui1/bt4.jpg', '000002ad', '1', 0),
(5, 'II16', 'button', '', '8c', '0c', '8c', '0c', 'X ray timer', 'tsui1/bt5.png', '000002ad', '1', 0),
(6, 'II05a', 'button', '', '8e', '0e', '8e', '0e', 'FOV-', 'tsui1/fov1.png', '000002ad', '1', 0),
(7, 'II05c', 'button', '', '8d', '0d', '8d', '0d', 'FOV+', 'tsui1/fov2.png', '000002ad', '1', 0),
(8, 'II06a', 'button', '', '90', '10', '90', '10', 'Landscape-', 'tsui1/landscape1.png', '000002ad', '1', 0),
(9, 'II06b', 'button', '', '8f', '0f', '8f', '0f', 'Landscape+', 'tsui1/landscape2.png', '000002ad', '1', 0),
(10, 'II07', 'button', '', '91', '11', '91', '11', 'Room light', 'tsui1/room.png', '000002ad', '1', 0),
(11, 'II09a', 'button', '', 'b3', '33', 'b3', '33', 'Spare Left', 'tsui1/spare1.png', '000002ad', '1', 0),
(12, 'II09b', 'button', '', 'b4', '34', 'b4', '34', 'Spare Middle', 'tsui1/spare2.png', '000002ad', '1', 0),
(13, 'II09c', 'button', '', 'b2', '32', 'b2', '32', 'Spare Right', 'tsui1/spare3.png', '000002ad', '1', 0),
(14, 'II4a1', 'button', '', 'a1', '21', 'a1', '21', 'Operator-', 'tsui1/operator1.jpg', '000002ad', '1', 0),
(15, 'II04a3', 'button', '', 'a2', '22', 'a2', '22', 'Operator+', 'tsui1/operator2.jpg', '000002ad', '1', 0),
(16, 'II10', 'button', '', '97', '17', '97', '17', 'Stop', 'tsui1/stop.jpg', '000002ad', '1', 0),
(17, 'II12', 'button', '', '94', '14', '94', '14', 'S/E', 'tsui1/se.jpg', '000002ad', '1', 0),
(18, 'II13', 'button', '', '93', '13', '93', '13', 'Test', 'tsui1/test.jpg', '000002ad', '1', 0),
(21, 'emcio hb', 'filter1', '05', '', '', '', '', 'Heartbeat EMCIO', '', '0000072d', '1', 60000),
(22, 'joystick', 'filter2', '000000000000', '', '', '', '', 'joystick', '', '000001ad', '1', 60000),
(23, '', 'joystick', '', '', '', '', '', '', '', '000001ad', '1', 0),
(24, 'LED', 'led', '', 'FFFF', '0000', 'FFFF', '0000', 'Led Blinking 1', '', '00000228', '1', 0),
(25, 'LED', 'led', '', 'FFFFFFFFFFFFFFFF', '0000000000000000', 'FFFFFFFFFFFFFFFF', '0000000000000000', 'Led Blinking 2', '', '00000328', '1', 0);

-- --------------------------------------------------------

--
-- Structure de la table `log_sn`
--

CREATE TABLE `log_sn` (
  `id` int(11) NOT NULL,
  `part_number` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `firmware` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tsui`
--

CREATE TABLE `tsui` (
  `id` int(11) NOT NULL,
  `part_number` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo_link` varchar(255) NOT NULL,
  `family` int(50) NOT NULL,
  `linked_sequence` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `tsui`
--

INSERT INTO `tsui` (`id`, `part_number`, `name`, `photo_link`, `family`, `linked_sequence`) VALUES
(1, 'test01', 'Elegance 2.3', 'tsui1/tsui1.jpg', 1, '1');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `dictionaries`
--
ALTER TABLE `dictionaries`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `log_sn`
--
ALTER TABLE `log_sn`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tsui`
--
ALTER TABLE `tsui`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `dictionaries`
--
ALTER TABLE `dictionaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `log_sn`
--
ALTER TABLE `log_sn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `tsui`
--
ALTER TABLE `tsui`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
