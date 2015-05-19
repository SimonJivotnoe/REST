<?php

use Phalcon\Mvc\Model,
    Phalcon\Validation,
    Phalcon\Mvc\Model\Validator\Email,
    Phalcon\Mvc\Model\Validator\Uniqueness;

class Orders extends Model
{

    /**
     *
     * @var integer
     */
    protected $order_id;

    /**
     *
     * @var integer
     */
    protected $car_id;

    /**
     *
     * @var integer
     */
    protected $user_id;

    /**
     *
     * @var string
     */
    protected $payment;

    /**
     * Method to set the value of field id
     *
     * @param integer $order_id
     * @return $this
     */
    public function setOrderId($order_id)
    {
        $this->order_id = $order_id;

        return $this;
    }

    /**
     * Method to set the value of field car_id
     *
     * @param integer $car_id
     * @return $this
     */
    public function setCarId($car_id)
    {
        $this->car_id = $car_id;

        return $this;
    }

    /**
     * Method to set the value of field user_id
     *
     * @param integer $user_id
     * @return $this
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * Method to set the value of field payment
     *
     * @param string $payment
     * @return $this
     */
    public function setPayment($payment)
    {
        $this->payment = $payment;

        return $this;
    }

    /**
     * Returns the value of field id
     *
     * @return integer
     */
    public function getOrderId()
    {
        return $this->order_id;
    }

    /**
     * Returns the value of field car_id
     *
     * @return integer
     */
    public function getCarId()
    {
        return $this->car_id;
    }

    /**
     * Returns the value of field user_id
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Returns the value of field payment
     *
     * @return string
     */
    public function getPayment()
    {
        return $this->payment;
    }

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->belongsTo('user_id', '\Phalcon\Mvc\Model\Users_rest', 'id', array('alias' => 'Users_rest'));
        $this->belongsTo('car_id', '\Phalcon\Mvc\Model\Autos', 'id', array('alias' => 'Autos'));
    }

    public function getSource()
    {
        return 'orders';
    }

    /**
     * Independent Column Mapping.
     * Keys are the real names in the table and the values their names in the application
     *
     * @return array
     */
    public function columnMap()
    {
        return array(
            'order_id' => 'order_id',
            'car_id' => 'car_id', 
            'user_id' => 'user_id', 
            'payment' => 'payment'
        );
    }

}
