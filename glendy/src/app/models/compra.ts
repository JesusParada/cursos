import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Compra {

    constructor(){
    }

    _id?: string;
    usuario? : Usuario;
    codigo_pago?: string;
    fecha?: Date;
    entregado?: boolean;
    costo_envio?: number;
    tipo_envio?: string;
    paqueteria?: string;
    productos : {
        producto : Producto,
        cantidad: number
    }[];
    nombre_receptor: string;
    direccion_envio: {
        calle: string,
        numero: number,
        numero_interior: String,
        colonia: String,
        municipio: string,
        ciudad: string,
        codigo_pais: string,
        codigo_postal: number,
        telefono: number,
        estado: string
    };
    razon_social?: String;
    rfc?: String;
    email?: String;
    telefono?: Number;
    direccion_fiscal?: {
        calle: String,
        numero: String,
        numero_interior: String,
        colonia: String,
        ciudad: String,
        codigo_pais: String,
        codigo_postal: String,
        municipio:String,
        estado: String
    };
}