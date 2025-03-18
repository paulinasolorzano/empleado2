-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-03-2025 a las 04:13:46
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdempleados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `curp` tinyint(1) DEFAULT 0,
  `rfc` tinyint(1) DEFAULT 0,
  `nss` tinyint(1) DEFAULT 0,
  `genero` varchar(50) NOT NULL,
  `tipoContrato` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `email`, `puesto`, `fechaNacimiento`, `curp`, `rfc`, `nss`, `genero`, `tipoContrato`) VALUES
(12, 'José Luis Pérez', 'jose.acosta@gmail.com', 'Director', '2025-03-14', 0, 1, 1, 'Prefiero no decirlo', 'Medio tiempo'),
(13, 'Fernando Leal Solórznao', 'fer.solorzano@gmail.com', 'asdfasdf', '1980-03-22', 1, 1, 0, 'Masculino', 'Tiempo completo'),
(14, 'Mario Fernández', 'mario.fernandez@gmail.com', 'Diseñador', '2000-03-12', 0, 1, 0, 'Femenino', 'Tiempo completo'),
(15, 'Luis Hernández', 'luis.her@gmail.com', 'Coordinador', '2025-03-14', 1, 0, 0, 'Femenino', 'Tiempo completo'),
(16, 'Mariana Peralta Córdoba', 'mariana@gmail.com', 'mariana', '2002-02-20', 1, 1, 1, 'Femenino', 'Tiempo completo'),
(17, 'Paulina solórzano', 'paulina.solorzano@gmail.com', 'Directora', '2000-03-13', 1, 1, 0, 'Femenino', 'Tiempo completo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
