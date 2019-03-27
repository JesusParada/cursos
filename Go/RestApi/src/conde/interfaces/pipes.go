package interfaces

import (
	"io"
	"os"
)

//PipeExample nos ayuda con varios ejemplos de más usos de interfaces io

func PipeExample() error {
	r, w := io.Pipe()

	//esto tiene que ser ejecutado en una rutna go separada
	// ya que se bloqueará esperando el reader
	// cerrar al final para limpieza

	go func() {
		//por ahora escribimos algo básico,
		//esto tambien puede ser usado para codificar json
		//base64 encode,, etc

		w.Write([]byte("testn"))
		w.Close()
	}()

	if _,err := io.Copy(os.Stdout , r); err != nil {
		return err
	}
	return nil
}