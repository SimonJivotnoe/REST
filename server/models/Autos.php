<?php

class Autos extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    protected $id;

    /**
     *
     * @var string
     */
    protected $brand;

    /**
     *
     * @var string
     */
    protected $model;

    /**
     *
     * @var string
     */
    protected $year;

    /**
     *
     * @var string
     */
    protected $capacity;

    /**
     *
     * @var string
     */
    protected $color;

    /**
     *
     * @var string
     */
    protected $max_speed;

    /**
     *
     * @var string
     */
    protected $price;

    /**
     * Method to set the value of field id
     *
     * @param integer $id
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Method to set the value of field brand
     *
     * @param string $brand
     * @return $this
     */
    public function setBrand($brand)
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * Method to set the value of field model
     *
     * @param string $model
     * @return $this
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * Method to set the value of field year
     *
     * @param string $year
     * @return $this
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Method to set the value of field capacity
     *
     * @param string $capacity
     * @return $this
     */
    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * Method to set the value of field color
     *
     * @param string $color
     * @return $this
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Method to set the value of field max_speed
     *
     * @param string $max_speed
     * @return $this
     */
    public function setMaxSpeed($max_speed)
    {
        $this->max_speed = $max_speed;

        return $this;
    }

    /**
     * Method to set the value of field price
     *
     * @param string $price
     * @return $this
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Returns the value of field id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Returns the value of field brand
     *
     * @return string
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * Returns the value of field model
     *
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Returns the value of field year
     *
     * @return string
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Returns the value of field capacity
     *
     * @return string
     */
    public function getCapacity()
    {
        return $this->capacity;
    }

    /**
     * Returns the value of field color
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Returns the value of field max_speed
     *
     * @return string
     */
    public function getMaxSpeed()
    {
        return $this->max_speed;
    }

    /**
     * Returns the value of field price
     *
     * @return string
     */
    public function getPrice()
    {
        return $this->price;
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
            'id' => 'id', 
            'brand' => 'brand', 
            'model' => 'model', 
            'year' => 'year', 
            'capacity' => 'capacity', 
            'color' => 'color', 
            'max_speed' => 'max_speed', 
            'price' => 'price'
        );
    }

}
