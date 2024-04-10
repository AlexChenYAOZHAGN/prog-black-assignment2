-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2024 at 12:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password_hash`) VALUES
(70, 'billy', 'billy@gmail.com', '$2y$10$9C6S47XjyhLtHOUlhUlq2eohF6Yk26VLaVV9.QCzwsUEu.A2JqWyq'),
(71, 'Lewis', 'lewis@gmail.com', '$2y$10$IkNpT1qIhlEySnRVAOn14O7dgftbYLP/0/u2sdIsajqVPAh0POHUW'),
(72, 'Mary', 'Mary@gmail.com', '$2y$10$hZAewzoIWT3WfFAZ4v3pYuL2YHGc2Cb8/NebJiczYvUUROIK95Gtu'),
(73, 'Jason', 'Jason@gmail.com', '$2y$10$bWr3OS4gLcbIac5RneSzDeBNZfvE6EdPABb2YvMDITurdPk3sYj7e'),
(74, 'Katheryn', 'Katheryn@gmail.com', '$2y$10$s825fkPC69Xi9KDfER.XPecana0vEI6DYPcPcBPh.2KkjoqKlNqPm'),
(75, 'Michael', 'Michael@gmail.com', '$2y$10$FKS0szhfB9LPW1r0mTNkYexBpjJuPhg7SELap2wbA3iNx8VAn3HKy'),
(76, 'JJ', 'JJ@gmail.com', '$2y$10$kDn3DTh5QBgk.Md4UqfavODRVDAwK/eYNcOofojVaso.EZ1jPUvxq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
