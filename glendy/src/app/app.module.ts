//imports de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Route} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
//Componentes de Material
import {MaterialModule} from './Material'
//Componentes de la app
import { AppComponent } from './app.component';
import { MenuComponent } from './components/componentes-pagina/menu/menu.component';
import { NosotrosComponent } from './components/componentes-pagina/nosotros/nosotros.component';
import { ProductosComponent } from './components/componentes-pagina/productos/productos.component';
import { ContactoComponent } from './components/componentes-pagina/contacto/contacto.component';
import { PrincipalComponent } from './components/componentes-pagina/principal/principal.component';
import { ComprasComponent } from './components/componentes-pagina/compras/compras.component';
import { MenuLateralComponent } from './components/componentes-pagina/menu-lateral/menu-lateral.component';
import { CarruselComponent } from './components/componentes-pagina/carrusel/carrusel.component';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';
import { GlendyComponent } from './components/componentes-pagina/glendy/glendy.component';
import { ProductoComponent } from './components/componentes-pagina/producto/producto.component';
import { ComentariosComponent } from './components/componentes-pagina/comentarios/comentarios.component';
import { ComunidadComponent } from './components/componentes-pagina/comunidad/comunidad.component'
//Graficas
import { ChartsModule } from 'ng2-charts';
//Servicios
import {DatosProductosService} from './services/datos-productos.service';
import {DatosUsuariosService} from './services/datos-usuarios.service';
import { LoginComponent } from './components/componentes-pagina/login/login.component';
import { SistemaComponent } from './components/componenetes-sistema/sistema/sistema.component';
import { ProductosSistemaComponent } from './components/componenetes-sistema/productos-sistema/productos-sistema.component';
import { UsuariosComponent } from './components/componenetes-sistema/usuarios/usuarios.component';
import { NuevoProductoComponent } from './components/componenetes-sistema/nuevo-producto/nuevo-producto.component';
import { DialogoConfirmacionComponent } from './components/componenetes-sistema/dialogo-confirmacion/dialogo-confirmacion.component';
import { EditarProductoComponent } from './components/componenetes-sistema/editar-producto/editar-producto.component';
import { ConfirmarVentaComponent } from './components/componentes-pagina/confirmar-venta/confirmar-venta.component';
import { NuevoEmpleadoComponent } from './components/componenetes-sistema/nuevo-empleado/nuevo-empleado.component';
import { ComentariosSistemaComponent } from './components/componenetes-sistema/comentarios-sistema/comentarios-sistema.component';
import { CarritoComponent } from './components/componentes-pagina/carrito/carrito.component';
import { VentasTotalesComponent } from './components/componenetes-sistema/ventas-totales/ventas-totales.component';
import { EntregaVentasComponent } from './components/componenetes-sistema/entrega-ventas/entrega-ventas.component';
import { EditarComentarioComponent } from './components/componenetes-sistema/editar-comentario/editar-comentario.component';
import { VentasProductosComponent } from './components/componenetes-sistema/ventas-productos/ventas-productos.component';
import { VentasMesComponent } from './components/componenetes-sistema/ventas-mes/ventas-mes.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GraficaPastelComponent } from './components/componenetes-sistema/grafica-pastel/grafica-pastel.component';

const routes: Route [] = [
  {path: '', component : CarruselComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'comunidad', component: ComunidadComponent},
  {path: 'glendy', component: GlendyComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'sistema', component: SistemaComponent, canActivate: [AuthGuardService]},
  {path: 'carrito', component: CarritoComponent, canActivate: [LoginGuardService]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NosotrosComponent,
    ProductosComponent,
    ContactoComponent,
    PrincipalComponent,
    ComprasComponent,
    MenuLateralComponent,
    CarruselComponent,
    GlendyComponent,
    ProductoComponent,
    ComentariosComponent,
    ComunidadComponent,
    LoginComponent,
    SistemaComponent,
    ProductosSistemaComponent,
    UsuariosComponent,
    NuevoProductoComponent,
    DialogoConfirmacionComponent,
    EditarProductoComponent,
    ConfirmarVentaComponent,
    NuevoEmpleadoComponent,
    ComentariosSistemaComponent,
    CarritoComponent,
    VentasTotalesComponent,
    EntregaVentasComponent,
    EditarComentarioComponent,
    VentasProductosComponent,
    VentasMesComponent,
    GraficaPastelComponent
  ],
  entryComponents:[
    LoginComponent,
    DialogoConfirmacionComponent,
    EditarProductoComponent,
    EditarComentarioComponent,
    ConfirmarVentaComponent,
    GraficaPastelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    Ng2CarouselamosModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot()
  ],
  providers: [DatosProductosService,DatosUsuariosService,AuthGuardService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
