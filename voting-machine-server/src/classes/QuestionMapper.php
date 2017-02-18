<?php
class QuestionMapper extends Mapper
{
    public function getQuestions() {
        $sql = "SELECT q.question_id, q.question, q.answer_A, q.answer_B, q.answer_C, q.answer_D
            from questions q";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $questions_from_db = $stmt->fetchObject();
        return json_encode($questions_from_db) ;
    }
    /**
     * Get one ticket by its ID
     *
     * @param int $ticket_id The ID of the ticket
     * @return TicketEntity  The ticket
     */
    // // public function getTicketById($ticket_id) {
    // //     $sql = "SELECT t.id, t.title, t.description, c.component
    // --         from tickets t
    // --         join components c on (c.id = t.component_id)
    // --         where t.id = :ticket_id";
    // //     $stmt = $this->db->prepare($sql);
    // //     $result = $stmt->execute(["ticket_id" => $ticket_id]);
    // //     if($result) {
    // //         return new TicketEntity($stmt->fetch());
    // //     }
    // // }
    // public function save(TicketEntity $ticket) {
    //     $sql = "insert into tickets
    //         (title, description, component_id) values
    //         (:title, :description, 
    //         (select id from components where component = :component))";
    //     $stmt = $this->db->prepare($sql);
    //     $result = $stmt->execute([
    //         "title" => $ticket->getTitle(),
    //         "description" => $ticket->getDescription(),
    //         "component" => $ticket->getComponent(),
    //     ]);
    //     if(!$result) {
    //         throw new Exception("could not save record");
    //     }
    // }
}