<?php
class QuestionMapper extends Mapper
{
    public function getQuestions() {
        $sql = "SELECT q.question_id, q.question, q.answer_A, q.answer_B, q.answer_C, q.answer_D
            from questions q";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $questions_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($questions_from_db);
    }
}