<?php

class AnswerMapper extends Mapper
{
    public function test () {
        return "hello";
    }
    public function getAnswers() {
        $sql = "SELECT a.answer_id, q.question, a.answer_A, a.answer_B, a.answer_C, a.answer_D
        from answers a
        join questions q on (q.question_id = a.question_id)";
        $stmt = $this->db->query($sql);
        $answers_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $sumAnswers = $this->sumAnswers($answers_from_db);
        return json_encode($sumAnswers) ;
    }
    public function sumAnswers ($data) {
        $sum = array_reduce($data, function ($a, $b) {
            isset($a[$b['question']]) ? $a[$b['question']]['answer_A'] += $b['answer_A'] : $a[$b['question']] = $b;
            isset($a[$b['question']]) ? $a[$b['question']]['answer_B'] += $b['answer_B'] : $a[$b['question']] = $b;
            isset($a[$b['question']]) ? $a[$b['question']]['answer_C'] += $b['answer_C'] : $a[$b['question']] = $b;
            isset($a[$b['question']]) ? $a[$b['question']]['answer_D'] += $b['answer_D'] : $a[$b['question']] = $b;
            return $a;
        });
        return $sum;
    }
}