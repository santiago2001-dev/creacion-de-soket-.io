-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 01:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bdempresa`
--

-- --------------------------------------------------------

--
-- Table structure for table `cargos`
--

CREATE TABLE `cargos` (
  `cargo_ID` int(11) NOT NULL,
  `cargo_nombre` varchar(50) NOT NULL,
  `cargo_sueldo_minimo` decimal(10,2) DEFAULT NULL,
  `cargo_sueldo_maximo` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cargos`
--

INSERT INTO `cargos` (`cargo_ID`, `cargo_nombre`, `cargo_sueldo_minimo`, `cargo_sueldo_maximo`) VALUES
(1, 'Analista', 2000.00, 4000.00),
(2, 'Desarrollador', 3000.00, 6000.00),
(3, 'Gerente', 5000.00, 10000.00),
(4, 'Director', 8000.00, 15000.00),
(5, 'Asistente', 1000.00, 2000.00);

-- --------------------------------------------------------

--
-- Table structure for table `ciudades`
--

CREATE TABLE `ciudades` (
  `ciud_ID` int(11) NOT NULL,
  `ciud_pais_ID` int(11) DEFAULT NULL,
  `ciud_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ciudades`
--

INSERT INTO `ciudades` (`ciud_ID`, `ciud_pais_ID`, `ciud_nombre`) VALUES
(1, 1, 'Bogotá'),
(2, 1, 'Medellín'),
(3, 2, 'Buenos Aires'),
(4, 3, 'Lima'),
(5, 4, 'Santiago');

-- --------------------------------------------------------

--
-- Table structure for table `departamentos`
--

CREATE TABLE `departamentos` (
  `dpto_ID` int(11) NOT NULL,
  `dpto_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departamentos`
--

INSERT INTO `departamentos` (`dpto_ID`, `dpto_nombre`) VALUES
(1, 'Recursos Humanos'),
(2, 'Finanzas'),
(3, 'Desarrollo'),
(4, 'Marketing'),
(5, 'Ventas');

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `empl_ID` int(11) NOT NULL,
  `empl_primer_nombre` varchar(50) NOT NULL,
  `empl_segundo_nombre` varchar(50) DEFAULT NULL,
  `empl_email` varchar(100) DEFAULT NULL,
  `empl_fecha_nac` date DEFAULT NULL,
  `empl_sueldo` decimal(10,2) DEFAULT NULL,
  `empl_comision` decimal(5,2) DEFAULT NULL,
  `empl_cargo_ID` int(11) DEFAULT NULL,
  `empl_Gerente_ID` int(11) DEFAULT NULL,
  `empl_dpto_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`empl_ID`, `empl_primer_nombre`, `empl_segundo_nombre`, `empl_email`, `empl_fecha_nac`, `empl_sueldo`, `empl_comision`, `empl_cargo_ID`, `empl_Gerente_ID`, `empl_dpto_ID`) VALUES
(1, 'Juan', 'Perez', 'juan.perez@hot.com', '1990-01-01', 3500.00, 10.00, 2, NULL, 3),
(2, 'Maria', 'Lopez', 'maria.lopez@gmail.com', '1985-05-10', 5000.00, 5.00, 3, 1, 1),
(3, 'Carlos', 'Gomez', 'carlos.gomez@sam.com', '1992-07-21', 2500.00, NULL, 1, 2, 4),
(4, 'Ana', 'Martinez', 'ana.martinez@hot.com', '1988-12-12', 4500.00, 7.00, 4, 3, 5),
(5, 'Luis', 'Torres', 'luis.torres@gmail.com', '1995-09-30', 2000.00, NULL, 5, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `historico`
--

CREATE TABLE `historico` (
  `emphist_ID` int(11) NOT NULL,
  `emphist_fecha_retiro` date DEFAULT NULL,
  `emphist_cargo_ID` int(11) DEFAULT NULL,
  `emphist_dpto_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historico`
--

INSERT INTO `historico` (`emphist_ID`, `emphist_fecha_retiro`, `emphist_cargo_ID`, `emphist_dpto_ID`) VALUES
(1, '2022-01-15', 1, 1),
(2, '2022-06-10', 2, 2),
(3, '2023-03-05', 3, 3),
(4, '2023-07-20', 4, 4),
(5, '2024-02-25', 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `localizaciones`
--

CREATE TABLE `localizaciones` (
  `localiz_ID` int(11) NOT NULL,
  `localiz_ciudad_ID` int(11) DEFAULT NULL,
  `localiz_direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `localizaciones`
--

INSERT INTO `localizaciones` (`localiz_ID`, `localiz_ciudad_ID`, `localiz_direccion`) VALUES
(1, 1, 'Av. Carrera 10 #20-30'),
(2, 2, 'Calle 50 #10-20'),
(3, 3, 'Av. Libertador #12-34'),
(4, 4, 'Calle. Arequipa #56-7'),
(5, 5, 'Cra Providencia #9-87');

-- --------------------------------------------------------

--
-- Table structure for table `paises`
--

CREATE TABLE `paises` (
  `pais_ID` int(11) NOT NULL,
  `pais_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paises`
--

INSERT INTO `paises` (`pais_ID`, `pais_nombre`) VALUES
(1, 'Colombia'),
(2, 'Argentina'),
(3, 'Perú'),
(4, 'Chile'),
(5, 'México');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`cargo_ID`);

--
-- Indexes for table `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`ciud_ID`),
  ADD KEY `ciud_pais_ID` (`ciud_pais_ID`);

--
-- Indexes for table `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`dpto_ID`);

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`empl_ID`),
  ADD KEY `empl_cargo_ID` (`empl_cargo_ID`),
  ADD KEY `empl_Gerente_ID` (`empl_Gerente_ID`),
  ADD KEY `empl_dpto_ID` (`empl_dpto_ID`);

--
-- Indexes for table `historico`
--
ALTER TABLE `historico`
  ADD PRIMARY KEY (`emphist_ID`),
  ADD KEY `emphist_cargo_ID` (`emphist_cargo_ID`),
  ADD KEY `emphist_dpto_ID` (`emphist_dpto_ID`);

--
-- Indexes for table `localizaciones`
--
ALTER TABLE `localizaciones`
  ADD PRIMARY KEY (`localiz_ID`),
  ADD KEY `localiz_ciudad_ID` (`localiz_ciudad_ID`);

--
-- Indexes for table `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`pais_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`ciud_pais_ID`) REFERENCES `paises` (`pais_ID`);

--
-- Constraints for table `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`empl_cargo_ID`) REFERENCES `cargos` (`cargo_ID`),
  ADD CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`empl_Gerente_ID`) REFERENCES `empleados` (`empl_ID`),
  ADD CONSTRAINT `empleados_ibfk_3` FOREIGN KEY (`empl_dpto_ID`) REFERENCES `departamentos` (`dpto_ID`);

--
-- Constraints for table `historico`
--
ALTER TABLE `historico`
  ADD CONSTRAINT `historico_ibfk_1` FOREIGN KEY (`emphist_cargo_ID`) REFERENCES `cargos` (`cargo_ID`),
  ADD CONSTRAINT `historico_ibfk_2` FOREIGN KEY (`emphist_dpto_ID`) REFERENCES `departamentos` (`dpto_ID`);

--
-- Constraints for table `localizaciones`
--
ALTER TABLE `localizaciones`
  ADD CONSTRAINT `localizaciones_ibfk_1` FOREIGN KEY (`localiz_ciudad_ID`) REFERENCES `ciudades` (`ciud_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
