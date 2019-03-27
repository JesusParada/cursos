package interfaces

import (
	"fmt"
	"io"
	"os"
)

//Copy copia los datos desde in a out primero directamente,
//luego usa un buffer Tambien escribe a stdout

func Copy(in io.ReadSeeker, out io.Writer) error {
	w := io.MultiWriter(out, os.Stdin)
	
	//una copia estandar, esto puede ser peligroso si hay muchos datos en in
	if _, err := io.Copy(w , in); err != nil {
		return err
	}

	in.Seek(0,0)

	//escritura en buffer utilizando fragmentos de 64 bytes

	buf := make([]byte,64)
	if _,err := io.CopyBuffer(w, in, buf); err := != nil{
		return err
	}

	//imprimimos una nueva linea
	fmt.Println()

	return nil
}