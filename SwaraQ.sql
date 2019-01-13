-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 13, 2019 at 11:08 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `metro`
--

-- --------------------------------------------------------

--
-- Table structure for table `EventPemilihan`
--

CREATE TABLE `EventPemilihan` (
  `ID` int(11) NOT NULL,
  `Tipe` varchar(20) NOT NULL,
  `Lokasi` varchar(50) NOT NULL,
  `Tahun` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `EventPemilihan`
--

INSERT INTO `EventPemilihan` (`ID`, `Tipe`, `Lokasi`, `Tahun`, `CreatedAt`) VALUES
(1, 'Pilpres', 'Indonesia', 2014, '2018-12-18 02:16:06'),
(3, 'Pilgub', 'Bogor', 2019, '2018-12-18 02:23:20'),
(4, 'Pilkada', 'Bandung', 2020, '2018-12-18 02:25:03'),
(5, 'Pilpres', 'Indonesia', 2019, '2018-12-18 03:11:03');

-- --------------------------------------------------------

--
-- Table structure for table `PasanganCalon`
--

CREATE TABLE `PasanganCalon` (
  `EventID` int(11) NOT NULL,
  `NomorPasangan` int(11) NOT NULL,
  `NamaPasangan` varchar(25) NOT NULL,
  `NamaKetua` varchar(50) NOT NULL,
  `NamaWakil` varchar(50) NOT NULL,
  `VisiMisi` text NOT NULL,
  `Foto` varchar(50) NOT NULL,
  `DetailBerkas` varchar(50) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PasanganCalon`
--

INSERT INTO `PasanganCalon` (`EventID`, `NomorPasangan`, `NamaPasangan`, `NamaKetua`, `NamaWakil`, `VisiMisi`, `Foto`, `DetailBerkas`, `CreatedAt`) VALUES
(1, 1, 'PDIP', 'Joko Widodo', 'Jusuf Kalla', '                                                                    <h3>Visi - Misi Pasangan Calon ... </h3>\r\n                                                                ', '1_1_FOTO_Paslon_1.jpg', '1_1_Detail_IJET_–_IOT_BASED_SMART_HOME.pdf', '2018-12-18 02:16:07'),
(1, 2, 'Gerindra', 'Prabowo Subianto', 'Hatta Rajasa', '<h3>Visi - Misi Pasangan Calon ... </h3>', '1_2_FOTO_Paslon_2.png', '1_2_Detail_INTRODUCTION_TO_BLUETOOTH_LOW_ENERGY.pd', '2018-12-18 02:16:07'),
(2, 1, 'PDIP', 'Joko Widodo', 'Jusuf Kalla', '                                                                    <h3>Visi - Misi Pasangan Calon ... </h3>\r\n                                                                ', '2_1_FOTO_Paslon_1.jpg', '2_1_Detail_IJET_–_IOT_BASED_SMART_HOME.pdf', '2018-12-18 02:16:20'),
(2, 2, 'Gerindra', 'Prabowo Subianto', 'Hatta Rajasa', '<h3>Visi - Misi Pasangan Calon ... </h3>', '2_2_FOTO_Paslon_2.png', '2_2_Detail_INTRODUCTION_TO_BLUETOOTH_LOW_ENERGY.pd', '2018-12-18 02:16:21'),
(3, 1, 'A', 'B', 'C', '                                                                    <h3>Visi - Misi Pasangan Calon ... </h3>\r\n                                                                ', '3_1_FOTO_', '3_1_Detail_', '2018-12-18 02:23:21'),
(4, 1, 'A', 'B', 'C', '                                                                    <h3>Visi - Misi Pasangan Calon ... </h3>\r\n                                                                ', '4_1_FOTO_', '4_1_Detail_', '2018-12-18 02:25:03'),
(4, 2, 'A2', 'B2', 'C2', '<h3>Visi - Misi Pasangan Calon ... </h3>', '4_2_FOTO_', '4_2_Detail_', '2018-12-18 02:25:03'),
(5, 0, '', '', '', '<h3>Visi - Misi Pasangan Calon ... </h3>', '5__FOTO_', '5__Detail_', '2018-12-18 03:11:04'),
(5, 1, 'JokowiMaruf', 'Jokowi', 'Amir Maruf', '                                                                    <h3>Visi - Misi Pasangan Calon ... </h3>\r\n                                                                ', '5_1_FOTO_Paslon_1.jpg', '5_1_Detail_IJET_–_IOT_BASED_SMART_HOME.pdf', '2018-12-18 03:11:03'),
(5, 2, 'PrabowoSandi', 'Prabowo Subianto', 'Sandiaga Uno', '<h3>Visi - Misi Pasangan Calon ... </h3>', '5_2_FOTO_Paslon_2.png', '5_2_Detail_INTRODUCTION_TO_BLUETOOTH_LOW_ENERGY.pd', '2018-12-18 03:11:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `EventPemilihan`
--
ALTER TABLE `EventPemilihan`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `PasanganCalon`
--
ALTER TABLE `PasanganCalon`
  ADD PRIMARY KEY (`EventID`,`NomorPasangan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `EventPemilihan`
--
ALTER TABLE `EventPemilihan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
