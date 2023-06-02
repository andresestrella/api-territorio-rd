-- Create-Drop database, for testing purposes

-- create database isn't necessary if in the docker-compose file the POSTGRES_DB is set to the name of the database. and the rest of this script wouldn't run if that is the case.
-- CREATE DATABASE territorios;

\c territorios;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL
);
INSERT INTO users (username, password) VALUES ('admin', 'admin');

DROP TABLE IF EXISTS paises CASCADE;
CREATE TABLE paises(
  pais_id serial PRIMARY KEY NOT NULL,
  nombre varchar(45) NOT NULL
);
INSERT INTO paises VALUES (1, 'Republica Dominicana');


DROP TABLE IF EXISTS provincias CASCADE;
CREATE TABLE provincias(
  provincia_id serial PRIMARY KEY,
  nombre varchar(45),
  pais_id INT NOT NULL,
  CONSTRAINT fk_pais_id
    FOREIGN KEY (pais_id)
      REFERENCES paises(pais_id) ON DELETE CASCADE
);
INSERT INTO provincias VALUES (1,'Azua', 1),(2,'Bahoruco', 1),(3,'Barahona',1),(4,'Dajabon',1),(5,'Distrito Nacional',1),(6,'Duarte',1),(7,'Elias Piña',1),(8,'El Seibo',1),(9,'Espaillat',1),(10,'Hato Mayor',1),(11,'Hermanas Mirabal',1),(12,'Independencia',1),(13,'La Altagracia',1),(14,'La Romana',1),(15,'La Vega',1),(16,'Maria Trinidad Sanchez',1),(17,'Monseñor Nouel',1),(18,'Monte Cristi',1),(19,'Monte Plata',1),(20,'Pedernales',1),(21,'Peravia',1),(22,'Puerto Plata',1),(23,'Samana',1),(24,'Sanchez Ramirez',1),(25,'San Cristobal',1),(26,'San Jose de Ocoa',1),(27,'San Juan',1),(28,'San Pedro de Macoris',1),(29,'Santiago',1),(30,'Santiago Rodriguez',1),(31,'Santo Domingo',1),(32,'Valverde',1);


DROP TABLE IF EXISTS municipios CASCADE;
CREATE TABLE municipios(
  municipio_id SERIAL PRIMARY KEY,
  nombre varchar(45),
  provincia_id INT,
  CONSTRAINT fk_provincia_id
    FOREIGN KEY (provincia_id)
      REFERENCES provincias (provincia_id) ON DELETE CASCADE
);
INSERT INTO municipios (nombre, provincia_id) VALUES ('Distrito Nacional', 5), ('Azua de Compostela', 1), ('Estebania', 1), ('Guayabal', 1), ('Las Charcas', 1), ('Las Yayas de Viajama', 1), ('Padre Las Casas', 1), ('Peralta', 1), ('Pueblo Viejo', 1), ('Sabana Yegua', 1), ('Tabara Arriba', 1), ('Neiba', 2), ('Galvan', 2), ('Los Rios', 2), ('Tamayo', 2), ('Villa Jaragua', 2), ('Barahona', 3), ('Cabral', 3), ('El Peñon', 3), ('Enriquillo', 3), ('Fundacion', 3), ('Jaquimeyes', 3), ('La Cienaga', 3), ('Las Salinas', 3), ('Paraiso', 3), ('Polo', 3), ('Vicente Noble', 3), ('Dajabon', 4), ('El Pino', 4), ('Loma de Cabrera', 4), ('Partido', 4), ('Restauracion', 4), ('San Francisco de Macoris', 6), ('Arenoso', 6), ('Castillo', 6), ('Eugenio Maria de Hostos', 6), ('Las Guaranas', 6), ('Pimentel', 6), ('Villa Riva', 6), ('El Seibo', 8), ('Miches', 8), ('Comendador', 7), ('Banica', 7), ('El Llano', 7), ('Hondo Valle', 7), ('Juan Santiago', 7), ('Pedro Santana', 7), ('Moca', 9), ('Cayetano Germosen', 9), ('Gaspar Hernandez', 9), ('Jamao al Norte', 9), ('Hato Mayor del Rey', 10), ('El Valle', 10), ('Sabana de la Mar', 10), ('Salcedo', 11), ('Tenares', 11), ('Villa Tapia', 11), ('Jimani', 12), ('Cristobal', 12), ('Duverge', 12), ('La Descubierta', 12), ('Mella', 12), ('Postrer Rio', 12), ('Higüey', 13), ('San Rafael del Yuma', 13), ('La Romana', 14), ('Guaymate', 14), ('Villa Hermosa', 14), ('La Concepcion de La Vega', 15), ('Constanza', 15), ('Jarabacoa', 15), ('Jima Abajo', 15), ('Nagua', 16), ('Cabrera', 16), ('El Factor', 16), ('Rio San Juan', 16), ('Bonao', 17), ('Maimon', 17), ('Piedra Blanca', 17), ('Montecristi', 18), ('Castañuela', 18), ('Guayubin', 18), ('Las Matas de Santa Cruz', 18), ('Pepillo Salcedo', 18), ('Villa Vasquez', 18), ('Monte Plata', 19), ('Bayaguana', 19), ('Peralvillo', 19), ('Sabana Grande de Boya', 19), ('Yamasa', 19), ('Pedernales', 20), ('Oviedo', 20), ('Bani', 21), ('Nizao', 21), ('Puerto Plata', 22), ('Altamira', 22), ('Guananico', 22), ('Imbert', 22), ('Los Hidalgos', 22), ('Luperon', 22), ('Sosua', 22), ('Villa Isabela', 22), ('Villa Montellano', 22), ('Samana', 23), ('Las Terrenas', 23), ('Sanchez', 23), ('San Cristobal', 25), ('Bajos de Haina', 25), ('Cambita Garabito', 25), ('Los Cacaos', 25), ('Sabana Grande de Palenque', 25), ('San Gregorio de Nigua', 25), ('Villa Altagracia', 25), ('Yaguate', 25), ('San Jose de Ocoa', 26), ('Rancho Arriba', 26), ('Sabana Larga', 26), ('San Juan de la Maguana', 27), ('Bohechio', 27), ('El Cercado', 27), ('Juan de Herrera', 27), ('Las Matas de Farfan', 27), ('Vallejuelo', 27), ('San Pedro de Macoris', 28), ('Consuelo', 28), ('Guayacanes', 28), ('Quisqueya', 28), ('Ramon Santana', 28), ('San Jose de Los Llanos', 28), ('Cotui', 24), ('Cevicos', 24), ('Fantino', 24), ('La Mata', 24), ('Santiago', 29), ('Bisono', 29), ('Janico', 29), ('Licey al Medio', 29), ('Puñal', 29), ('Sabana Iglesia', 29), ('San Jose de las Matas', 29), ('Tamboril', 29), ('Villa Gonzalez', 29), ('San Ignacio de Sabaneta', 30), ('Los Almacigos', 30), ('Moncion', 30), ('Santo Domingo Este', 31), ('Boca Chica', 31), ('Los Alcarrizos', 31), ('Pedro Brand', 31), ('San Antonio de Guerra', 31), ('Santo Domingo Norte', 31), ('Santo Domingo Oeste', 31), ('Mao', 32), ('Esperanza', 32), ('Laguna Salada', 32);


DROP TABLE IF EXISTS distritos CASCADE;
CREATE TABLE distritos(
  distrito_id SERIAL PRIMARY KEY,
  nombre varchar(45),
  municipio_id INT,
  CONSTRAINT municipio_id
    FOREIGN KEY (municipio_id)
      REFERENCES municipios (municipio_id)
);
INSERT INTO distritos VALUES (1,'Barreras',2), (2,'Barro Arriba',2), (3,'Clavellina',2), (4,'Emma Balaguer Viuda Vallejo',2), (5,'Las Barias-La Estancia',2), (6,'Las Lomas',2), (7,'Los Jovillos',2), (8,'Puerto Viejo',2), (9,'Hatillo',5), (10,'Palmar de Ocoa',5), (11,'Villarpando',6), (12,'Hato Nuevo-Cortes',6), (13,'La Siembra',7), (14,'Las Lagunas',7), (15,'Los Frios',7), (16,'El Rosario',9), (17,'Proyecto 4',10), (18,'Ganadero',10), (19,'Proyecto 2-C',10), (20,'Amiama Gomez',11), (21,'Los Toros',11), (22,'Tabara Abajo',11), (23,'El Palmar',12), (24,'El Salado',13), (25,'Las Clavellinas',14), (26,'Cabeza de Toro',15), (27,'Mena',15), (28,'Monserrat',15), (29,'Santa Barbara-El 6',15), (30,'Santana',15), (31,'Uvilla',15), (32,'El Cachon',17), (33,'La Guazara',17), (34,'Villa Central',17), (35,'Arroyo Dulce',20), (36,'Pescaderia',21), (37,'Palo Alto',22), (38,'Bahoruco',23), (39,'Los Patos',25), (40,'Canoa',27), (41,'Fondo Negro',27), (42,'Quita Coraza',27), (43,'Cañongo',28), (44,'Manuel Bueno',4), (45,'Capotillo',30), (46,'Santiago de la Cruz',30), (47,'Cenovi',33), (48,'Jaya',33), (49,'La Peña',33), (50,'Presidente Don Antonio Guzman Fernandez',33), (51,'Aguacate',34), (52,'Las Coles',34), (53,'Sabana Grande',36), (54,'Agua Santa del Yuna',39), (55,'Barraquito',39), (56,'Cristo Rey de Guaraguao',39), (57,'Las Taranas',39), (58,'Pedro Sanchez',40), (59,'San Francisco-Vicentillo',40), (60,'Santa Lucia',41), (61,'El Cedro',41), (62,'La Gina',41), (63,'Guayabo',42), (64,'Sabana Larga',42), (65,'Sabana Cruz',43), (66,'Sabana Higüero',43), (67,'Guanito',44), (68,'Rancho de la Guardia',45), (69,'Rio Limpio',47), (70,'Canca La Reina',48), (71,'El Higüerito',48), (72,'Jose Contreras',48), (73,'Juan Lopez',48), (74,'La Ortega',48), (75,'Las Lagunas',48), (76,'Monte de la Jagua',48), (77,'San Victor',48), (78,'Joba Arriba',50), (79,'Veragua',50), (80,'Villa Magante',50), (81,'Guayabo Dulce',52), (82,'Mata Palacio',52), (83,'Yerba Buena',52), (84,'Elupina Cordero de Las Cañitas',54), (85,'Jamao Afuera',55), (86,'Blanco',56), (87,'Boca de Cachon',58), (88,'El Limon',58), (89,'Batey 8',59), (90,'Vengan a Ver',60), (91,'La Colonia',62), (92,'Guayabal',63), (93,'La Otra Banda',64), (94,'Lagunas de Nisibon',64), (95,'Veron-Punta Cana',64), (96,'Bayahibe',65), (97,'Boca de Yuma',65), (98,'Caleta',66), (99,'Cumayasa',68), (100,'El Ranchito',69), (101,'Rio Verde Arriba',69), (102,'La Sabina',70), (103,'Tireo',70), (104,'Buena Vista',70), (105,'Manabao',71), (106,'Rincon',72), (107,'Arroyo al Medio',73), (108,'Las Gordas',73), (109,'San Jose de Matanzas',73), (110,'Arroyo Salado',74), (111,'La Entrada',74), (112,'El Pozo',75), (113,'Arroyo Toro-Masipedro',77), (114,'La Salvia-Los Quemados',77), (115,'Jayaco',77), (116,'Juma Bejucal',77), (117,'Sabana del Puerto',77), (118,'Juan Adrian',79), (119,'Villa Sonador',79), (120,'Palo Verde',81), (121,'Cana Chapeton',82), (122,'Hatillo Palma',82), (123,'Villa Elisa',82), (124,'Boya',86), (125,'Chirino',86), (126,'Don Juan',86);

