<?php

class AnswerMapper extends Mapper
{
    public function getAnswers() {
        $sql = "SELECT a.answer_id, q.question, a.answer_A, a.answer_B, a.answer_C, a.answer_D
            from answers a
            join questions q on (q.question_id = a.question_id)";
        $stmt = $this->db->query($sql);
        $results = [];
        while($row = $stmt->fetch()) {
            $results[] = new AnswerEntity($row);
        }
        return $results;
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