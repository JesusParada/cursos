import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VentasService } from '../../../services/ventas.service';
import { Producto } from '../../../models/producto';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Compra } from '../../../models/compra';
import { MailCotizacionService } from '../../../services/mail.cotizacion.service';
import { EstadosService } from '../../../services/estados.service';
import { CodigosPostalesService } from 'src/app/services/codigos-postales.service';

export interface Envio{
  paqueteria: string;
  servicio: string;
  estimado_entrega: string;
  precio_base: string;
  precio_total: string;
  currency : string;
}

export interface Estado{
  estado: string;
  clave: string; 
}

@Component({
  selector: 'app-confirmar-venta',
  templateUrl: './confirmar-venta.component.html',
  styleUrls: ['./confirmar-venta.component.css']
})
export class ConfirmarVentaComponent implements OnInit {
  isLinear = false;
  cargando : boolean = false;
  requiereFactura: boolean = false;
  codigoPostal : boolean = false;
  nombre: FormGroup;
  direccion: FormGroup;
  envio: FormGroup;
  factura: FormGroup;
  compra : Compra;
  envioSeleccionado : Envio;
  envios: Envio[];
  colonias: string[];
  estados: Estado[] = [];
  municipio: string = '';
  estado: string = '';
  coloniasFactura: string[];
  municipioFactura: string = '';
  estadoFactura: string = '';
  

  constructor(private _formBuilder: FormBuilder,
    private ventasService : VentasService,
    private snackBar : MatSnackBar,
    private estadosService : EstadosService,
    private codigosPostalesService : CodigosPostalesService,
    private cotizacionEmailService: MailCotizacionService,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {
      this.compra = new Compra();
      this.cargarEstados("mexico");
    }

    mostrarMensaje(message: string) {
      this.snackBar.open(message, "", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }

  ngOnInit() {
    this.nombre = this._formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
    this.direccion = this._formBuilder.group({
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      numero_interior: [''],
      colonia: ['', Validators.required],
      municipio: [{value:this.municipio,disabled:true},Validators.required],
      estado: [{value:this.estado,disabled:true}, Validators.required],
      codigo_pais: [{value:'MX',disabled:true}, Validators.required],
      codigo_postal: ['', [ Validators.min(10000), Validators.maxLength(99999)]],
      telefono: ['999999999', [ Validators.min(1000000),Validators.required]]
    });
    this.envio = this._formBuilder.group({
      paqueteria: ['', Validators.required],
      envioSeleccionado: ['', Validators.required]
    });
    this.factura = this._formBuilder.group({
      requiereFactura: [false,Validators.required],
      razon_social: ['', Validators.required],
      rfc: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      numero_interior: [''],
      colonia: ['', Validators.required],
      municipio: [{value:this.municipioFactura,disabled:true},Validators.required],
      estado: [{value:this.estadoFactura,disabled:true}, Validators.required],
      codigo_pais: ['', Validators.required],
      codigo_postal: ['', [ Validators.min(10000), Validators.maxLength(99999)]],
      telefono: ['', [ Validators.min(1000000),Validators.required]]

    })
    
  }

  cargarEstados(pais: String){
    this.estadosService.getEstados(pais).subscribe( res =>{
      this.estados = res.estados;
    })
  }

  buscarCPenvio(){
    let codigo = this.direccion.get('codigo_postal').value;
    if(codigo.length == 5){
      this.codigosPostalesService.getInfoDireccion(codigo).subscribe(
        res =>{
          if(res.estado.length != 0){
            this.limpiarEnvios();
            this.municipio = res.municipio;
            this.estado = res.estado;
            this.colonias = res.colonias;
          }else{
            this.mostrarMensaje("El código postal ingresado es inválido");
          }
        }
      )
    }else{
      this.direccion.get('colonia').setValue('');
      this.municipio = '';
      this.colonias = [];
      this.estado = '';
    }
  }

  buscarCPfactura(){
    let codigo = this.factura.get('codigo_postal').value;
    if(codigo.length == 5){
      this.codigosPostalesService.getInfoDireccion(codigo).subscribe(
        res =>{
          if(res.estado.length != 0){
            this.municipioFactura = res.municipio;
            this.estadoFactura = res.estado;
            this.coloniasFactura = res.colonias;
          }else{
            this.mostrarMensaje("El código postal ingresado es inválido");
          }
        }
      )
    }else{
      this.factura.get('colonia').setValue('');
      this.municipioFactura = '';
      this.coloniasFactura = [];
      this.estadoFactura = '';
    }
  }
  
  limpiarEnvios(){
    this.envio.setValue({envioSeleccionado: '',paqueteria:"" });
    this.envios = [];
  }

  cargarDatos(){
    this.factura.setValue({
      requiereFactura: this.factura.get("requiereFactura").value,
      razon_social: 'Juan Quevedo',
      rfc: 'ZZZ999999SUV',
      email: 'example@domain.com',
      calle: this.direccion.get('calle').value,
      numero: this.direccion.get('numero').value,
      numero_interior: this.direccion.get('numero_interior').value,
      colonia: this.direccion.get('colonia').value,
      municipio: this.municipio,
      estado: this.estado,
      codigo_pais: this.direccion.get('codigo_pais').value,
      codigo_postal: this.direccion.get('codigo_postal').value,
      telefono: this.direccion.get('telefono').value
    })
  }

  cotizar(){
    this.cargando= true;
    this.envio.setValue({envioSeleccionado: '',paqueteria: this.envio.get("paqueteria").value });
    this.compra.nombre_receptor = this.nombre.get("nombres").value+" "+this.nombre.get("apellidos").value;
    this.compra.direccion_envio = {
      calle : this.direccion.get("calle").value,
      ciudad : this.municipio,
      codigo_pais : this.direccion.get("codigo_pais").value, 
      codigo_postal : this.direccion.get("codigo_postal").value, 
      estado : this.estado,
      numero : this.direccion.get("numero").value, 
      numero_interior: this.direccion.get("numero_interior").value,
      colonia:this.direccion.get("colonia").value,
      municipio : this.municipio,
      telefono : this.direccion.get("telefono").value
    }
    this.compra.paqueteria = this.envio.get("paqueteria").value;
    let productos : {producto:Producto, cantidad: number}[]= [];
    for(let producto of this.data){
      productos.push({producto: producto.producto, cantidad : producto.cantidad});
    } 
    this.compra.productos = productos;
    this.cotizacionEmailService.cotizar(this.compra).subscribe(
      res =>{
        if(res.data != undefined){
          let envios : Envio[] = [];
          for(let env of res.data as any[]){
            let envio = {
            paqueteria : env.carrier,
            servicio: env.service,
            estimado_entrega: env.deliveryEstimate,
            precio_base: env.basePrice,
            precio_total: env.totalPrice,
            currency : env.currency,
            };
            envios.push(envio);
          }
          this.envios = envios;
          this.cargando = false;
        } else{
          this.mostrarMensaje("No se encontró ningun envío con esa paquetería");
          this.cargando = false;
        }
      }, err =>{
        this.mostrarMensaje("Error en el servidor, intente más tarde");
        this.cargando = false;
      }); 
  }

  comprar(){
    this.cargando = true;
    this.compra.costo_envio = Number.parseInt(this.envio.get("envioSeleccionado").value.precio_total);
    this.compra.tipo_envio = this.envio.get("envioSeleccionado").value.servicio;
    this.compra.paqueteria = this.envio.get("envioSeleccionado").value.paqueteria;
    this.compra.nombre_receptor = this.nombre.get("nombres").value+" "+this.nombre.get("apellidos").value;
    this.compra.direccion_envio = {
      calle : this.direccion.get("calle").value,
      ciudad : this.municipio,
      codigo_pais : this.direccion.get("codigo_pais").value, 
      codigo_postal : this.direccion.get("codigo_postal").value, 
      estado : this.estado,
      numero : this.direccion.get("numero").value, 
      numero_interior: this.direccion.get("numero_interior").value,
      colonia:this.direccion.get("colonia").value,
      municipio : this.municipio,
      telefono : this.direccion.get("telefono").value
    }
    if(this.factura.get("requiereFactura").value === true){
      this.compra.razon_social = this.factura.get("razon_social").value;
      this.compra.rfc = this.factura.get("rfc").value;
      this.compra.email = this.factura.get("email").value;
      this.compra.telefono = this.factura.get("telefono").value;
      this.compra.direccion_fiscal = {
        calle : this.factura.get("calle").value,
        ciudad : this.municipioFactura,
        codigo_pais : this.factura.get("codigo_pais").value,
        codigo_postal : this.factura.get("codigo_postal").value, 
        estado : this.estadoFactura,
        numero : this.factura.get("numero").value,
        numero_interior: this.factura.get("numero_interior").value,
        colonia:this.factura.get("colonia").value,
        municipio : this.factura.get("municipio").value
        }
      }
    this.ventasService.crearVenta(this.compra).subscribe(res => {
      window.location.href = res.url;     
    }, err => {
      this.cargando = false;
      this.mostrarMensaje("Ocurrió un error, intente más tarde");
    });
  }

}
