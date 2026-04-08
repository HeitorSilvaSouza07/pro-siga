use ProSigaDevDb

create table tblUsuarios(
idUser int identity(1,1) primary key,
nameUser varchar(100) not null,
materiaUser varchar(100) not null
)

create table tblAtividades(
idAtv int identity(1,1) primary key,
idUser int not null,
nameAtv varchar(100),
dataEntrega datetime,
typeAtv bit ,
foreign key (idUser) references tblUsuarios(idUser)
)