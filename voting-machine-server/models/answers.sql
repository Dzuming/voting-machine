CREATE TABLE IF NOT EXISTS `answers` (
  `answer_id` int(10) NOT NULL auto_increment,
  `question_id` int(10) default '0',
  `answer_A` int(1) default '0',
  `answer_B` int(1) default '0',
  `answer_C` int(1) default '0',
  `answer_D` int(1) default '0',
  PRIMARY KEY  (`answer_id`),

  FOREIGN KEY (question_id)
        REFERENCES questions(question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;