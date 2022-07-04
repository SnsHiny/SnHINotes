DELIMITER // 
CREATE FUNCTION rand_string1(n INT) 
RETURNS VARCHAR(255) 
#该函数会返回一个字符串 
BEGIN
DECLARE chars_str VARCHAR(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ'; 
DECLARE return_str VARCHAR(255) DEFAULT ''; 
DECLARE i INT DEFAULT 0; 
WHILE i < n DO 
SET return_str =CONCAT(return_str,SUBSTRING(chars_str,FLOOR(1+RAND()*52),1)); 
SET i = i + 1; 
END WHILE; 
RETURN return_str; 
END // 
DELIMITER ;

DELIMITER // 
CREATE PROCEDURE insert_s1 (IN min_num INT (10),IN max_num INT (10)) 
BEGIN
DECLARE i INT DEFAULT 0; 
SET autocommit = 0; 
REPEAT SET i = i + 1; 
INSERT INTO s1 VALUES( (min_num + i), rand_string1(6), (min_num + 30 * i + 5), rand_string1(6), rand_string1(10), rand_string1(5), rand_string1(10), rand_string1(10)); 
UNTIL i = max_num 
END REPEAT;
COMMIT; 
END // 
DELIMITER ;

DELIMITER // 
CREATE PROCEDURE insert_s2 (IN min_num INT (10),IN max_num INT (10)) 
BEGIN
DECLARE i INT DEFAULT 0; 
SET autocommit = 0; 
REPEAT SET i = i + 1; 
INSERT INTO s2 VALUES( (min_num + i), rand_string1(6), (min_num + 30 * i + 5), rand_string1(6), rand_string1(10), rand_string1(5), rand_string1(10), rand_string1(10)); 
UNTIL i = max_num 
END REPEAT; 
COMMIT; 
END // 
DELIMITER ;

CALL insert_s1(10001,10000);
CALL insert_s2(10001,10000);