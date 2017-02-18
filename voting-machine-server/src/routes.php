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
    $response->getBody()->write(var_export($questions, true));
    return $questions;
});
$app->get('/answers', function (Request $request, Response $response) {
    $this->logger->addInfo("Answers list");
    $mapper = new AnswerMapper($this->db);
    $answers = $mapper->getAnswers();
    $newResponse = $response->withHeader('Content-type', 'application/json');
    
    return $newResponse->withJson($answers);
});
$app->run();