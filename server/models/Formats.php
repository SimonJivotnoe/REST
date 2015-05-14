<?php

class Formats {

private $format;
private $data = array();
public function __construct ($format) {
  $this->format = $format;
}
public function transfer ($data) {
  if ('' == $this->format || '.json' == $this->format) {
    return $this->returnJSON($data); 
  } else if ('.xml' == $this->format) {
    return $this->returnXML($data); 
  } else if ('.html' == $this->format) {
    return $this->returnHTML($data); 
  } else {
    return $this->returnTXT($data); 
  }
}
public function returnJSON() {
  foreach( $autos as $auto){
        $this->data[] = array(
            'id' => $auto->getId(),
            'img' => $auto->getImg(),
            'brand' => $auto->getBrand(),
            'model' => $auto->getModel()
        );
    }
    return $this->data;
}
public function returnXML() {
  
}
public function returnHTML() {
  
}
public function returnTXT() {
  
}
}
