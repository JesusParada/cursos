package main 
import (
	"fmt"
	"log"
	"net/http"
)

const (
	CONN_HOST = "localhost"
	CONN_PORT = "8080"
)

func iniciarServidor( w http.ResponseWriter, r *http.Request ){
	fmt.Fprintf( w, "¡Servidor creado en Go ")
}

func main (){
	http.HandleFunc("/", iniciarServidor)
	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, nil)
	if err != nil{
		log.Fatal("Error al iniciar servidor")
		return 
	}
}