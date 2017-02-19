<?php 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
spl_autoload_register(function ($classname) {
    require (".././src/classes/" . $classname . ".php");
});

$app->get('/questions', function (Request $request, Response $response) {
    $this->logger->addInfo("Questions list");
    $mapper = new QuestionMapper($this->db);
    $questions = $mapper->getQuestions();
    return $questions;
});
$app->get('/answers', function (Request $request, Response $response) {
    $this->logger->addInfo("Answers list");
    $mapper = new AnswerMapper($this->db);
    $answers = $mapper->getAnswers();
    return $answers;
});
$app->post("/answers", function ($request, $response) {
    $this->logger->addInfo("Answer save");
    $mapper = new AnswerMapper($this->db);
    $answer = $mapper->saveAnswer($request->getParsedBody());
});
$app->run();