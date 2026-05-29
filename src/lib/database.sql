-- Migração PostgreSQL para criar as tabelas do projeto

CREATE TABLE IF NOT EXISTS tblusuarios (
  iduser SERIAL PRIMARY KEY,
  nameuser VARCHAR(255) NOT NULL,
  materiauser VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tblatividades (
  idatv SERIAL PRIMARY KEY,
  iduser INTEGER NOT NULL REFERENCES tblusuarios(iduser),
  nameatv VARCHAR(255) NOT NULL,
  dataentrega TIMESTAMP NOT NULL,
  typeatv BOOLEAN NOT NULL,
  descatv VARCHAR(1500)
);
