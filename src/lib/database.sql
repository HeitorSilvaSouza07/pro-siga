-- Migração PostgreSQL para Neon
-- Use DATABASE_URL no .env para apontar para o Neon

DROP TABLE IF EXISTS tblatividades;
DROP TABLE IF EXISTS tblusuarios;

CREATE TABLE tblusuarios (
  iduser SERIAL PRIMARY KEY,
  nameuser VARCHAR(255) NOT NULL,
  materiauser VARCHAR(255) NOT NULL
);

CREATE TABLE tblatividades (
  idatv SERIAL PRIMARY KEY,
  iduser INTEGER NOT NULL REFERENCES tblusuarios(iduser),
  nameatv VARCHAR(255) NOT NULL,
  dataentrega TIMESTAMP NOT NULL,
  typeatv BOOLEAN NOT NULL,
  descatv VARCHAR(1500)
);

INSERT INTO tblusuarios (iduser, nameuser, materiauser) VALUES
  (1, 'heitor', 'sql'),
  (2, 'Humberto', 'Web 1'),
  (3, 'Rennan ', 'Engenharia de Software'),
  (4, 'João', 'Design'),
  (5, 'Teste ', 'vdgcvgsvd'),
  (6, 'heitor', 'teste'),
  (7, 'heitor', 'teste'),
  (8, 'leandro', 'qualquer coisa'),
  (9, 'teste', 'batat'),
  (10, 'humberto', 'web 1'),
  (11, 'teste hoje', 'te'),
  (12, 'teste 123', 'teste');

INSERT INTO tblatividades (idatv, iduser, nameatv, dataentrega, typeatv, descatv) VALUES
  (1, 1, 'teste', '2026-04-16 20:26:00', true, NULL),
  (2, 1, 'testet dois', '2026-04-29 20:26:00', true, NULL),
  (3, 2, 'prova', '2026-04-30 20:28:00', true, NULL),
  (4, 4, 'tetste', '2026-04-16 20:53:00', false, NULL),
  (5, 1, 'bla', '2026-04-23 22:41:00', true, NULL),
  (6, 8, 'Trablho de apresentação do app', '2026-04-17 18:50:00', true, NULL),
  (7, 2, 'Atividade/Prova de web1', '2026-04-17 21:03:00', true, NULL),
  (8, 12, 'teste', '2026-05-09 19:34:00', true, NULL);

SELECT setval(pg_get_serial_sequence('tblusuarios', 'iduser'), 12, true);
SELECT setval(pg_get_serial_sequence('tblatividades', 'idatv'), 8, true);
