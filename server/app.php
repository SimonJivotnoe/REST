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
            'id' => $robot->id,
            'brand' => $robot->brand,
        );
    }

    //echo json_encode($data);
    echo json_encode($robots);
});
/**
 * Not found handler
 */
$app->notFound(function () use ($app) {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo $app['view']->render('404');
});
//phalcon create-model --name=autos --output=models --get-set --namespace=\Phalcon\Mvc\Model --extends=Model --doc;
