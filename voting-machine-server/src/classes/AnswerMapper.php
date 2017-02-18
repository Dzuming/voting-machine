<?php

class AnswerMapper extends Mapper
{
    public function getAnswers() {
        $sql = "SELECT a.answer_id, q.question, a.answer_A, a.answer_B, a.answer_C, a.answer_D
            from answers a
            join questions q on (q.question_id = a.question_id)";
        $stmt = $this->db->query($sql);
        $answers_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($answers_from_db) ;
    }
}