




use  House

create table Landing
(
	Id		int primary key identity,
	Name	varchar(30),
	Pwd		varchar(30)
)

insert into Landing values('������','123456')
insert into Landing values('mzn','123456')
insert into Landing values('wyb','123456')
insert into Landing values('zyh','123456')
insert into Landing values('����','123456')

select * from Landing


 create table Reister
(
	Rid			int primary key identity,
	Rname 		varchar(100),  --����
	Rphone		varchar(13),  --�ֻ���
	Rpwd		varchar(30)		--����
 )

 select *  from Reister