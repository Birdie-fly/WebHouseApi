




use  House

create table Landing
(
	Id		int primary key identity,
	Name	varchar(30),
	Pwd		varchar(30)
)

insert into Landing values('ÃÏÕÕÄİ','123456')
insert into Landing values('mzn','123456')
insert into Landing values('wyb','123456')
insert into Landing values('zyh','123456')
insert into Landing values('¹ş¹ş','123456')

select * from Landing


 create table Reister
(
	Rid			int primary key identity,
	Rname 		varchar(100),  --ĞÕÃû
	Rphone		varchar(13),  --ÊÖ»úºÅ
	Rpwd		varchar(30)		--ÃÜÂë
 )

 select *  from Reister