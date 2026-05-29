-- cria o db do projeto
-- CREATE DATABASE "ProSigaDevDb";

-- conecte-se ao banco criado (ex: \c ProSigaDevDb)

-- cria a tabela de usuarios
CREATE TABLE tblUsuarios (
  idUser SERIAL PRIMARY KEY,
  nameUser VARCHAR(100) NOT NULL,
  materiaUser VARCHAR(100) NOT NULL
);

-- cria a tabela de atividade e declara chave estrangeira com o idUser 
CREATE TABLE tblAtividades (
  idAtv SERIAL PRIMARY KEY,
  idUser INT NOT NULL,
  nameAtv VARCHAR(100),
  dataEntrega TIMESTAMP,
  typeAtv BOOLEAN,
  FOREIGN KEY (idUser) REFERENCES tblUsuarios(idUser)
);