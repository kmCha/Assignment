create database assignments;
CREATE USER 'assign_db_user'@'localhost' IDENTIFIED BY 'assign_db_password';
GRANT SELECT,INSERT,UPDATE,DELETE ON assignments.* TO 'assign_db_user'@'localhost';

CREATE TABLE IF NOT EXISTS assignments (
  sighting_id INT NOT NULL AUTO_INCREMENT,
  course_code varchar(35) NOT NULL,
  assignment_name varchar(35) NOT NULL,
  due_date date NOT NULL,
  PRIMARY KEY(sighting_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO assignments (course_code, assignment_name, due_date)
	VALUES ('ELG5376','Problem Assignment1','2015-10-10');

SELECT course_name, course_code, assignment_name, due_date from assignments order by due_date ASC;

alter table assignments add column course_name varchar(35) NOT NULL after sighting_id;

update assignments set course_name='Virtual E' where course_code='ELG5124';

SET SQL_SAFE_UPDATES = 0;