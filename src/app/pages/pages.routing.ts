import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarFacturasComponent } from './registrar-facturas/registrar-facturas.component';
import { VerFacturasComponent } from './ver-facturas/ver-facturas.component';
import { RegistrarTarjetasComponent } from './registrar-tarjetas/registrar-tarjetas.component';
import { VerTarjetasComponent } from './ver-tarjetas/ver-tarjetas.component';
import { DetallePagosComponent } from './detalle-pagos/detalle-pagos.component';
import { DetalleCuentaComponent } from './detalle-cuenta/detalle-cuenta.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'registrar-facturas', component: RegistrarFacturasComponent, data: {titulo: 'Registrar Facturas'} },
      { path: 'registrar-tarjetas', component: RegistrarTarjetasComponent, data: {titulo: 'Registrar Tarjetas'} },
      { path: 'ver-facturas', component: VerFacturasComponent, data: {titulo: 'Ver Facturas'} },
      { path: 'ver-tarjetas', component: VerTarjetasComponent, data: {titulo: 'Ver Tarjetas'} },
      { path: 'detalle-pagos', component: DetallePagosComponent, data: {titulo: 'Detalle Pagos'} },
      { path: 'detalle-cuenta', component: DetalleCuentaComponent, data: {titulo: 'Detalle Cuenta'} },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de Usuario'} },
    ]
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
