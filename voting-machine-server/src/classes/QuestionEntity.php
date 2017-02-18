<?php

class QuestionEntity
{
    protected $question_id;
    protected $question;
    protected $answer_A;
    protected $answer_B;
    protected $answer_C;
    protected $answer_D;
    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct(array $data) {
        // no id if we're creating
        if(isset($data['question_id'])) {
            $this->question_id = $data['question_id'];
        }
        $this->question = $data['question'];
        $this->answer_A = $data['answer_A'];
        $this->answer_B = $data['answer_B'];
        $this->answer_C = $data['answer_C'];
        $this->answer_D = $data['answer_D'];
    }
    public function getQuestion_id() {
        return $this->question_id;
    }
    public function getQuestion() {
        return $this->question;
    }
    public function getAnswer_A() {
        return $this->answer_A;
    }
    public function getAnswer_B() {
        return $this->answer_B;
    }
    public function getAnswer_C() {
        return $this->answer_C;
    }
    public function getAnswer_D() {
        return $this->answer_D;
    }
}