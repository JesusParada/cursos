package main

import (
	"fmt"
	"math/rand"
	"time"
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

func main(){
	seconds := time.Now().Unix()
	rand.Seed(seconds)
	target := rand.Intn(100)+1
	fmt.Println(target)
	fmt.Println("He elegido un número, adivinalo!")
	reader := bufio.NewReader(os.Stdin)
	for x:= 0 ; x<5; x++ {
		fmt.Println("Adivina el número : ")
		entrada, error := reader.ReadString('\n')
		if error != nil {
			log.Fatal(error)
		}
		entrada = strings.TrimSpace(entrada)
		adivina , error := strconv.Atoi(entrada)
		if error != nil {
			log.Fatal(error)
		}
		fmt.Println(adivina)
		if target > adivina{
			fmt.Println("El número es mayor")
		}else if target < adivina {
			fmt.Println("El número es menor")
		}else {
			fmt.Println("Lo lograste")
			break
		}
	}
}