-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2016 at 07:21 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `memberID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `active` varchar(255) NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetComplete` varchar(3) DEFAULT 'No',
  `starArray` varchar(255) NOT NULL,
  `money` int(11) NOT NULL,
  `carArray` varchar(255) NOT NULL,
  `selectedCar` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`memberID`, `username`, `password`, `email`, `active`, `resetToken`, `resetComplete`, `starArray`, `money`, `carArray`, `selectedCar`) VALUES
(4, 'tuan23', '$2y$10$z8H7Cjvpn2H6zZDIUdUfCOBDj9alSkF1KCmhS80I3ikPGZQm3V9Pq', 'bnbcrocket2308@gmail.com', 'Yes', NULL, 'No', '0,0,3,0,0,3,3,3,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4', 1800, '1,1,0,0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `playsession`
--

CREATE TABLE `playsession` (
  `sessionID` int(10) UNSIGNED NOT NULL,
  `question` text CHARACTER SET ascii NOT NULL,
  `answer` varchar(80) NOT NULL,
  `username` varchar(255) NOT NULL,
  `accuracy` int(11) NOT NULL,
  `uAnswer` varchar(255) NOT NULL,
  `correctAnswer` int(11) NOT NULL,
  `totalQues` int(11) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `playsession`
--

INSERT INTO `playsession` (`sessionID`, `question`, `answer`, `username`, `accuracy`, `uAnswer`, `correctAnswer`, `totalQues`, `difficulty`, `level`, `score`) VALUES
(169, '39 p 23,27 p 23,32 p 30,30 p 26,37 p 24,34 p 35,31 p 31,38 p 29,33 p 26,25 p 37', '62,50,62,56,61,69,62,67,59,62', 'tuan23', 70, '70', 7, 10, 2, 2, 0),
(171, '36 p 31,21 p 24,33 p 29,22 p 39,32 p 25,37 p 39,39 p 39,38 p 23,34 p 28,27 p 28', '67,45,62,61,57,76,78,61,62,55', 'tuan23', 60, '60', 6, 10, 2, 3, 0),
(172, '32 p 28,30 p 28,35 p 26,24 p 35,22 p 39,33 p 27,34 p 27,21 p 38,39 p 35,31 p 38', '60,58,61,59,61,60,61,59,74,69', 'tuan23', 40, '40', 4, 10, 2, 4, 0),
(173, ',-13 p -17,-2 p -19,-4 p -8,-11 p -2,-1 p -6,-8 p -1,-9 p -12,-16 p -10,-15 p -6,-17 p -13', ',-30,-21,-12,-13,-7,-9,-21,-26,-21,-30', 'tuan23', 90, '90', 9, 10, 0, 6, 0),
(178, '37 p 29,31 p 21,27 p 37,34 p 24,39 p 25,29 p 25,33 p 39,23 p 30,30 p 24,22 p 30', '66,52,64,58,64,54,72,53,54,52', 'tuan23', 70, '66,52,64,58,No answer,22,127,53,54,52', 7, 10, 2, 8, 0),
(249, '36 / 9,24 / 8,30 / 10,27 / 9,40 / 5,28 / 4,21 / 3,32 / 8,35 / 7,33 / 3', '4,3,3,3,8,7,7,4,5,11', 'tuan23', 100, '4,3,3,3,8,7,7,4,5,11', 10, 10, 2, 8, 10),
(255, '2 x 5,3 x 5,2 x 1,4 x 4,2 x 4,5 x 3,2 x 10,8 x 2,2 x 2,3 x 4', '10,15,2,16,8,15,20,16,4,12', 'tuan23', 100, '10,15,2,16,8,15,20,16,4,12', 10, 10, 1, 4, 10),
(256, '12 / 4,8 / 4,15 / 3,20 / 5,14 / 2,18 / 3,10 / 5,6 / 2,21 / 3,16 / 4', '3,2,5,4,7,6,2,3,7,4', 'tuan23', 100, '3,2,5,4,7,6,2,3,7,4', 10, 10, 1, 3, 10),
(267, '16 - 14', '2', 'tuan23', 100, '2', 1, 1, 1, 5, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`memberID`);

--
-- Indexes for table `playsession`
--
ALTER TABLE `playsession`
  ADD PRIMARY KEY (`sessionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `memberID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `playsession`
--
ALTER TABLE `playsession`
  MODIFY `sessionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
