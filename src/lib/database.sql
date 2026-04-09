//cria o db do projeto
create database ProSigaDevDb

//usa o db criado
use ProSigaDevDb

//cria a tabela de usuarios
create table tblUsuarios(
idUser int identity(1,1) primary key,
nameUser varchar(100) not null,
materiaUser varchar(100) not null
)

//cria a tabela de atividade e declara chave primaria com o idUser 
create table tblAtividades(
idAtv int identity(1,1) primary key,
idUser int not null,
nameAtv varchar(100),
dataEntrega datetime,
typeAtv bit ,
foreign key (idUser) references tblUsuarios(idUser)
)