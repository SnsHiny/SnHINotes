# 01-索引的创建

-- 第一种：create table
-- 隐式的方式创建索引，在声明有主键约束、唯一性约束、外键约束的字段上，会自动的添加相关索引  
create table dept (
	dept_id int primary key auto_increment,
    dept_name varchar(100)
);

create table emp (
	emp_id int primary key auto_increment,
    emp_name varchar(100) unique,
    dept_id int,
    constraint emp_dept_id_fk foreign key (dept_id) references dept(dept_id)
);

-- 第二种：CREATE TABLE table_name [col_name data_type] [UNIQUE | FULLTEXT | SPATIAL] [INDEX | KEY] [index_name] (col_name [length]) [ASC | DESC]
-- 显示的方式创建索引 
create table book (
	# 创建主键索引
	book_id int primary key auto_increment,
    book_name varchar(100),
    comment varchar(100),
    info varchar(100),
    # 创建普通索引 
    index idx_bname(book_name),
    # 创建唯一索引
    unique index uk_idx_cmt(comment),
    # 创建联合索引
    index mul_bid_bname_info(book_id, book_name, info),
    # 创建全文索引
    fulltext index fullt_info(info)
);

-- 第三种：ALTER TABLE table_name ADD [UNIQUE | FULLTEXT | SPATIAL] [INDEX | KEY] [index_name] (col_name[length],...) [ASC | DESC]
-- 第四种：CREATE [UNIQUE | FULLTEXT | SPATIAL] INDEX index_name ON table_name (col_name[length],...) [ASC | DESC]

-- 通过命令查看索引
show index from book;