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
        return array_values($sum);
    }
    public function saveAnswer($body) {
        $sql = "INSERT INTO answers (question_id, answer_A, answer_B, answer_C, answer_D) VALUES ( :question_id, :answer_A, :answer_B, :answer_C, :answer_D);";
        $stmt = $this->db->prepare($sql);
        $form_data =$body;
        $question_id=$form_data['question_id'];
        $answer_A=$form_data['answer_A'];
        $answer_B=$form_data['answer_B'];
        $answer_C=$form_data['answer_C'];
        $answer_D=$form_data['answer_D'];
        $stmt->bindParam(':question_id', $question_id, PDO::PARAM_INT);
        $stmt->bindParam(':answer_A', $answer_A);
        $stmt->bindParam(':answer_B', $answer_B);
        $stmt->bindParam(':answer_C', $answer_C);
        $stmt->bindParam(':answer_D', $answer_D);
        $stmt->execute();
        
    }
}