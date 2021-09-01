CREATE TABLE estudiantes (
	id SERIAL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	rut varchar(12) NOT NULL,
	curso varchar(20) NOT NULL,
	nivel varchar(2) NOT NULL
);

SELECT * FROM estudiantes;