package main

import (
	"net/http"
)

func main() {
	//Rutas
	http.HandleFunc("/",homeHandler)
	http.HandleFunc("/contact",contactHandler)

	// Inicio de servidor
	http.ListenAndServe(":3000", nil)
}

func homeHandler(res http.ResponseWriter , req *http.Request) {
	res.Write([]byte("Hello World"))
}

func contactHandler(res http.ResponseWriter , req *http.Request){
	res.Write([]byte("Contact PAge"))
}