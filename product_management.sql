-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 04:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `product_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `manufacturer` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `quantity`, `images`, `manufacturer`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Product 1', 'Description 1', '29.99', 50, '[\"image1.jpg\", \"image2.jpg\"]', 'Manufacturer 1', '2024-01-26 10:10:53', '2024-01-26 10:10:53', 1),
(2, 'Product 2', 'Description 2', '19.99', 30, '[\"image3.jpg\", \"image4.jpg\"]', 'Manufacturer 2', '2024-01-26 10:10:53', '2024-01-26 10:10:53', 1),
(3, 'test', 'description', '100.00', 2, NULL, 'sanket', '2024-01-27 11:03:48', '2024-01-27 11:03:48', 1),
(4, 'test', 'description', '100.00', 2, NULL, 'sanket', '2024-01-27 11:17:54', '2024-01-27 11:17:54', 1),
(5, 'Product Sanket', 'Test description', '200.00', 3, NULL, 'sanket', '2024-01-28 05:22:19', '2024-01-28 05:22:19', 1),
(6, 'Product Sanket 2', 'Test description', '200.00', 3, NULL, 'sanket', '2024-01-28 06:52:28', '2024-01-28 06:52:28', 1),
(7, 'Product Sanket 2', 'Test description', '200.00', 3, NULL, 'sanket', '2024-01-28 06:54:48', '2024-01-28 06:54:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`, `status`) VALUES
(1, 'admin', '$2b$10$ZV0VzjPZWVv5VcNefVhQLOAzVmFN8scB8Zx4QanZCmGxtViLZshDG', 'admin', '2024-01-26 10:10:53', '2024-01-28 13:07:55', 1),
(2, 'user', '$2b$10$.W2pum/tWVv0NcymbFbCNOf6CDwJsfnWeTqg4X82OeLf3Vu/CYS/u', 'user', '2024-01-26 10:10:53', '2024-01-28 13:08:04', 1),
(3, 'sanket', '$2b$10$ZV0VzjPZWVv5VcNefVhQLOAzVmFN8scB8Zx4QanZCmGxtViLZshDG', 'admin', '2024-01-27 06:42:46', '2024-01-27 07:17:52', 1),
(4, 'user1', '$2b$10$.W2pum/tWVv0NcymbFbCNOf6CDwJsfnWeTqg4X82OeLf3Vu/CYS/u', 'user', '2024-01-27 11:08:16', '2024-01-27 11:08:16', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
