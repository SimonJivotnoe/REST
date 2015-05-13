<?php
/**
 * Local variables
 * @var \Phalcon\Mvc\Micro $app
 */

/**
 * Add your routes here
 */
$app->get('/', function () use ($app) {
    echo $app['view']->render('index');
});

// Получение всех роботов
$app->get('/api/autos', function() use ($app) {

    $phql = "SELECT * FROM Autos ORDER BY brand";
    $robots = $app->modelsManager->executeQuery($phql);

    $data = array();
    foreach( $robots as $robot){
        $data[] = array(
            'id' => $robot->getId(),
            'brand' => $robot->getBrand()
        );
    }

    echo json_encode($data);
});

// Получение робота по ключу
$app->get('/api/autos/{id:[0-9]+}', function($id) use ($app){

    $phql = "SELECT * FROM Autos WHERE id = :id:";
    $robot = $app->modelsManager->executeQuery($phql, array(
        'id' => $id
    ))->getFirst();

    //Create a response
    $response = new Phalcon\Http\Response();
    if ($robot == false) {
        $response->setJsonContent(array());
    } else {
        $response->setJsonContent(array(
                'id' => $robot->getId(),
                'name' => $robot->getBrand()
        ));
    }
    
    return $response;
    //return $response;
});
/**
 * Not found handler
 */
$app->notFound(function () use ($app) {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo $app['view']->render('404');
});
//phalcon create-model --name=autos --output=models --get-set --namespace=\Phalcon\Mvc\Model --extends=Model --doc;
