CREATE DATABASE snhidb1; 
USE snhidb1;
#1.创建学生表和课程表 
CREATE TABLE `student_info` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT, 
	`student_id` INT NOT NULL , 
	`name` VARCHAR(20) DEFAULT NULL, 
	`course_id` INT NOT NULL , 
	`class_id` INT(11) DEFAULT NULL, 
	`create_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    PRIMARY KEY (`id`) 
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

CREATE TABLE `course` ( 
	`id` INT(11) NOT NULL AUTO_INCREMENT, 
	`course_id` INT NOT NULL , 
	`course_name` VARCHAR(40) DEFAULT NULL, 
	PRIMARY KEY (`id`) 
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

#函数1：创建随机产生字符串函数 
DELIMITER // 
CREATE FUNCTION rand_string(n INT) 
	RETURNS VARCHAR(255) 
#该函数会返回一个字符串 
BEGIN 
	DECLARE chars_str VARCHAR(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ'; 
	DECLARE return_str VARCHAR(255) DEFAULT '';
	DECLARE i INT DEFAULT 0; 
	WHILE i < n DO 
		SET return_str = CONCAT(return_str, SUBSTRING(chars_str, FLOOR(1 + RAND() * 52), 1)); 
        SET i = i + 1; 
	END WHILE; 
    RETURN return_str; 
END // 
DELIMITER ; 

#函数2：创建随机数函数 
DELIMITER // 
CREATE FUNCTION rand_num (from_num INT ,to_num INT) 
	RETURNS INT(11) 
BEGIN 
	DECLARE i INT DEFAULT 0; 
    SET i = FLOOR(from_num + RAND() * (to_num - from_num + 1)); 
    RETURN i; 
END // 
DELIMITER ;

# mysql开启创建函数设置
select @@log_bin_trust_function_creators;
set global log_bin_trust_function_creators=1;

# 存储过程1：创建插入课程表存储过程 
DELIMITER // 
CREATE PROCEDURE insert_course( max_num INT ) 
BEGIN 
	DECLARE i INT DEFAULT 0; 
	SET autocommit = 0; #设置手动提交事务 
	REPEAT #循环 
		SET i = i + 1; #赋值 
		INSERT INTO course(course_id, course_name ) VALUES(rand_num(10000, 10100), rand_string(6)); 
		UNTIL i = max_num
	END REPEAT; 
    COMMIT; #提交事务 
END // 
DELIMITER ; 

# 存储过程2：创建插入学生信息表存储过程 
DELIMITER // 
CREATE PROCEDURE insert_stu( max_num INT ) 
BEGIN 
	DECLARE i INT DEFAULT 0; 
    SET autocommit = 0; #设置手动提交事务 
    REPEAT #循环 
		SET i = i + 1; #赋值 
        INSERT INTO student_info(course_id, class_id, student_id, NAME) VALUES(rand_num(10000, 10100), rand_num(10000, 10200), rand_num(1, 200000), rand_string(6)); 
        UNTIL i = max_num 
	END REPEAT; 
    COMMIT; #提交事务 
END // 
DELIMITER ;

# course表中插入一百条数据
CALL insert_course(100);
# student_info表中插入一百万条数据
CALL insert_stu(1000000);

# 查看表中索引
show index from student_info;

# 适合创建字段的索引
# ①.字段的数值有唯一性的限制
select * from student_info
where student_id = 102302;
# 为student_id字段添加索引（不创建索引花费2485ms；创建索引花费16ms）
create index idx_stuid on student_info(student_id); 
# 删除索引
drop index idx_stuid on student_info;

# ②.频繁作为WHERE查询条件的字段
# ③.经常GROUP BY和ORDER BY的列
# ④.UPDATE、DELETE的WHERE条件列
# ⑤.DISTINCT字段需要创建索引
# ⑥.多表JOIN连接操作时，对WHERE条件创建索引，对连接字段创建索引（连接表不宜超过三张）
# ⑦.使用列的类型小的字段创建索引
# ⑧.使用字符串前缀创建索引
# ⑨.区分度高（散列性高）的列适合作为索引
# ⑩.使用最频繁的列放到联合索引的左侧
# 补充：在多个字段都要创建索引的情况下，联合索引优于单值索引；单表索引数量不宜超过6个