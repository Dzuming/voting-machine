<?php
class QuestionMapper extends Mapper
{
    public function getQuestions() {
        $sql = "SELECT q.question_id, q.question, q.answer_A, q.answer_B, q.answer_C, q.answer_D
            from questions q";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $questions_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $random_question = $questions_from_db[rand(0, count($questions_from_db) - 1)];
        return json_encode($random_question);
    }
}