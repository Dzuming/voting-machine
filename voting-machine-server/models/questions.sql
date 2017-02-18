CREATE TABLE IF NOT EXISTS `questions` (
  `question_id` int(10) NOT NULL auto_increment,
  `question` varchar(50) default NULL,
  `answer_A` varchar(50) default NULL,
  `answer_B` varchar(50) default NULL,
  `answer_C` varchar(50) default NULL,
  `answer_D` varchar(50) default NULL,
  PRIMARY KEY  (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;