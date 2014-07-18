MetroExamServer
=========
##MySQL
```
linux version:
/usr/local/Cellar/mysql/5.6.10/bin/mysqld
/usr/local/Cellar/mysql/5.6.10/support-files/mysql.server start
/usr/local/Cellar/mysql/5.6.10/support-files/mysql.server stop
mysql -h localhost --auto-rehash -p -u root

```

Please modify config file "C:\mysql-5.6.19-win64\my-default.in" , and add one more line "character_set_server=utf8"
```
win version:
mysqld.exe --default-file="C:\mysql-5.6.19-win64\my-default.in"
mysql.exe -h localhost --auto-rehash -p -u root
set names 'utf8';

```

```
CREATE DATABASE metroexam_db;
USE metroexam_db;

--alter database metroexam_db default character set utf8 COLLATE utf8_general_ci;
SHOW VARIABLES LIKE 'character%';
show create database metroexam_db;
select default_character_set_name from information_schema.SCHEMATA S where schema_name = 'metroexam_db';
show create table employee_tbl;
show full columns from employee_tbl;
SHOW VARIABLES LIKE 'collation_%';
SHOW CHARACTER SET;

SHOW VARIABLES LIKE 'max_connections';
```

```
create table employee_tbl(
  nationalid varchar(20) primary key,
	employeeid varchar(20),
	employeename varchar(20),
	groupid varchar(20),
	lineid varchar(20),
	additonal_desc varchar(30),
	flag char(1)
);

insert into employee_tbl values('310115198701014321','56789','zhangjy','4001','line 4','add_desc','Y');
commit;

--clear all data in the table
truncate table employee_tbl;
--check employee information
select * from employee_tbl;

create table exam_score_record_tbl(
  id int primary key auto_increment,
	nationalid varchar(20) not null,
	score float,
	elapsed_ts timestamp,
	attended_ts timestamp default current_timestamp
);

select b.employeename, b.groupid, a.score, a.attended_ts from exam_score_record_tbl a, employee_tbl b where a.nationalid = b.nationalid order by a.score asc;

```
##DB Tools
####SQLDeveloper
http://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html

The `Preferences -> Environment -> Encoding` in SQLDeveloper is set currently to UTF-8
####mysql-workbench-community

##Express Node Server
static html: MetroExamServer/public/examination.html

static js: public/js/exam_func.js

```
cd MetroExamServer
node.exe bin/www

http://localhost:3000/examination.html

curl --data "nationalid=1111" http://localhost:3000/signin
```