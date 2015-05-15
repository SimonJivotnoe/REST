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

$app->get('/api/autos', function() use ($app) {

    $phql = "SELECT * FROM Autos ORDER BY brand";
    $autos = $app->modelsManager->executeQuery($phql);
    $objFormat = new Formats('', '');
    $data = array();
    $objFormat->transfer($autos);
});

$app->get('/api/autos/{string}', function($string) use ($app){
    $id = preg_replace("/[^0-9]/","",$string);
    $format = substr($string, strpos($string, ".") + 1);
    $objFormat = new Formats($format, $id);
    if ('' == $id) {
        $phql = "SELECT * FROM Autos ORDER BY brand";
        $autos = $app->modelsManager->executeQuery($phql);
        $objFormat->transfer($autos);
    } else {
        $phql = "SELECT * FROM Autos WHERE id = :id:";
        $auto = $app->modelsManager->executeQuery($phql, array(
            'id' => $id
        ))->getFirst();
        //Create a response
        $res = $objFormat->transfer($auto);
        if ('json' == $format) {
            $response = new Phalcon\Http\Response();
            if ($auto == false) {
                $response->setJsonContent(array());
            } else {
                $response->setJsonContent($res);
            }
            return $response;
        } else {
            return $res;
        }
    }
});

$app->get('/api/autos/search/{search}', function($search) use ($app) {
  /*  $phql = "SELECT * FROM Autos WHERE :$searchOption: LIKE :$searchInput: ORDER BY brand";
    $autos = $app->modelsManager->executeQuery($phql, array(
        'name' => '%' . $searchInput . '%'
    ));

    $data = array();

    foreach ($autos as $auto){
        $data[] = array(
            'id' => $auto->id,
            'name' => $auto->brand,
        );
    }

    echo json_encode($data);*/

});
/**
 * Not found handler
 */
$app->notFound(function () use ($app) {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo $app['view']->render('404');
});
//phalcon create-model --name=autos --output=models --get-set --namespace=\Phalcon\Mvc\Model --extends=\Phalcon\Mvc\Model --doc;
