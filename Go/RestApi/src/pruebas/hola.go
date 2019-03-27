package main

import (
	"bufio"
	"fmt"
	"os"
	"log"
	"math/rand"
	"time"
	"strings"
	"strconv"
)

func main(){
	seconds := time.Now().Unix()
	rand.Seed(seconds)
	target := rand.Intn(100)+1
	fmt.Println(target)

	leer := bufio.NewReader(os.Stdin)
	entrada, error := leer.ReadString('\n')
	entrada = strings.TrimSpace(entrada)
	adivina , error := strconv.Atoi(entrada)
	if error != nil {
		log.Fatal(error)
	}
	fmt.Print(entrada)
}