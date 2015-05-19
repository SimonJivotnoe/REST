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
    $searchOption = $app['request']->getQuery('searchOption', 'string');
    $phql = "SELECT * FROM Autos where $searchOption = :search:";
    $autos = $app->modelsManager->executeQuery($phql, array(
        'search' => $search
    ));
    $data = array();
    foreach ($autos as $auto){
        $data[] = array(
            'id' => $auto->getId(),
            'img' => $auto->getImg(),
            'brand' => $auto->getBrand(),
            'model' => $auto->getModel(),
            'year' => $auto->getYear(),
            'capacity' => $auto->getCapacity(),
            'color' => $auto->getColor(),
            'max_speed' => $auto->getMaxSpeed(),
            'price' => $auto->getPrice()
        );
    }
    echo json_encode($data);
});
$app->post('/api/autos', function() use ($app) {
    $pass = $app->request->getPost('pass');
    $email = $app->request->getPost('email');
    $phql = "INSERT INTO UsersRest (email, pass) VALUES (:email:, :pass:)";
    $status = $app->modelsManager->executeQuery($phql, array(
        'email' => $email,
        'pass' => $pass
    ));
    $response = new Phalcon\Http\Response();
    if ($status->success() == true) {
        $response->setStatusCode(201, "Created");
        $id = $status->getModel()->id;
        $response->setJsonContent(array('status' => 'OK', 'data' => $id));
    } else {
        $response->setStatusCode(409, "Conflict");
        $errors = array();
        foreach ($status->getMessages() as $message) {
            $errors[] = $message->getMessage();
        }
        $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));
    }
    return $response;
});
$app->put('/api/autos/login', function() use ($app) {
    $email = $app->request->getPut('email');
    $pass = $app->request->getPut('pass');
    $phql = "SELECT * FROM UsersRest WHERE email = 'test@mail.ru' AND pass = 'test'";
    /*$user = $app->modelsManager->executeQuery($phql, array(
        'email' => $email,
        'pass' => $pass
    ))->getFirst();*/
    $user = $app->modelsManager->executeQuery($phql)->getFirst();
    print_r($user);
        die();
    $id = '';
    if (count($user)) {
        
        $id = $user->getId();
        echo $id;
        die();
        $token = md5(time() . $id);
        $phql = "UPDATE UsersRest SET token = '$token' WHERE id = $id";
        $status = $app->modelsManager->executeQuery($phql);
        $response = new Phalcon\Http\Response();
        if ($status->success() == true) {
            $response->setStatusCode(666, $token);
        } else {
            $response->setStatusCode(409, "Conflict");
            $errors = array();
            foreach ($status->getMessages() as $message) {
                $errors[] = $message->getMessage();
            }
            $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));
        }
        return $response;
    } else {
        print_r(count($user));
    }
});
$app->put('/api/autos/logout/{token}', function($token) use ($app) {
    $phql = "SELECT * FROM UsersRest WHERE token = '$token'";
    $res = $app->modelsManager->executeQuery($phql)->getFirst();
    if (count($res)) {
        $id = $res->getId();
        $phql = "UPDATE UsersRest SET token = NULL WHERE id = $id";
        $status = $app->modelsManager->executeQuery($phql);
        $response = new Phalcon\Http\Response();
        if ($status->success() == true) {
            $response->setStatusCode(666, 'OK');
        } else {
            $response->setStatusCode(409, "Conflict");
            $errors = array();
            foreach ($status->getMessages() as $message) {
                $errors[] = $message->getMessage();
            }
            $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));
        }
        return $response;
    } else {
        print_r(count($res));
    }

});
$app->get('/api/autos/cabinet/{token}', function($token) use ($app) {
    $phql = "SELECT * FROM UsersRest WHERE token = '$token'";
    $res = $app->modelsManager->executeQuery($phql)->getFirst();
    if (count($res)) {
        $id = $res->getId();
        $phql = "SELECT Orders.*, Autos.* FROM Orders JOIN Autos ON Autos.id = Orders.car_id WHERE Orders.user_id = '$id'";
        $status = $app->modelsManager->executeQuery($phql);
        $data = array();
        foreach ($status as $item){
            foreach ($item as $key => $auto) {
                if ('orders' == $key) {
                    $data[] = array(
                        'order_id' => $auto->getOrderId());
                } else {
                    $data[] = array(
                        'model' => $auto->getModel(),
                        'price' => $auto->getPrice());
                }

            }
        }
        echo json_encode($data);
    } else {
        print_r(count($res));
    }
});
$app->delete('/api/autos/cabinet/{id:[0-9]+}', function($id) use ($app) {
    $tokenObj = $app->request->getJsonRawBody();
    $token = $tokenObj->token;
    $phql = "SELECT * FROM UsersRest WHERE token = '$token'";
    $res = $app->modelsManager->executeQuery($phql)->getFirst();
    if (count($res)) {
        $phql = "DELETE FROM Orders WHERE order_id = :id:";
    $status = $app->modelsManager->executeQuery($phql, array(
        'id' => $id
    ));
    $response = new Phalcon\Http\Response();

    if ($status->success() == true) {
        $response->setJsonContent(array('OK'));
    } else {
        $response->setStatusCode(409, "Conflict");
        $errors = array();
        foreach ($status->getMessages() as $message) {
            $errors[] = $message->getMessage();
        }

        $response->setJsonContent(array('status' => 'ERROR', 'messages' => $errors));

    }

    return $response;
    }
    
});
/**
 * Not found handler
 */
$app->notFound(function () use ($app) {
    $app->response->setStatusCode(404, "Not Found")->sendHeaders();
    echo $app['view']->render('404');
});
//phalcon create-model --name=autos --output=models --get-set --namespace=\Phalcon\Mvc\Model --extends=\Phalcon\Mvc\Model --doc;

