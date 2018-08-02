-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  mar. 31 juil. 2018 à 10:12
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `ajax_form`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nom` varchar(30) DEFAULT NULL,
  `prenom` varchar(30) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `cp` varchar(5) DEFAULT NULL,
  `ville` varchar(30) DEFAULT NULL,
  `cni` varchar(100) DEFAULT NULL,
  `date_inscription` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `nom`, `prenom`, `adresse`, `cp`, `ville`, `cni`, `date_inscription`) VALUES
(1, 'test@gmail.com', 'azerty', 'Hossepian', 'Audrey', '2, route de saint André', 5200, 'Embrun', 'upload/IMG_2116.jpg', '2018-07-30 18:30:14'),
(2, 'audrey@gmail.com', 'azerty', NULL, NULL, NULL, NULL, NULL, NULL, '2018-07-31 09:44:40'),
(3, 'toto@gmail.com', 'azerty', NULL, NULL, NULL, NULL, NULL, NULL, '2018-07-31 09:47:16');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
