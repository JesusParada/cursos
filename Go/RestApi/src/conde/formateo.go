package main 

import (
	"fmt"
)

func main (){
	var ancho, largo, area float64
	ancho = 7.5
	largo = 8.3
	area = largo * ancho
	fmt.Println(area / 10.0 , "cajas de cesped necesarias")
	fmt.Printf("El area es : %0.2f", area/ 10)
}