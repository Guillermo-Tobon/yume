import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarFacturasComponent } from './registrar-facturas/registrar-facturas.component';
import { VerFacturasComponent } from './ver-facturas/ver-facturas.component';
import { RegistrarTarjetasComponent } from './registrar-tarjetas/registrar-tarjetas.component';
import { VerTarjetasComponent } from './ver-tarjetas/ver-tarjetas.component';
import { DetallePagosComponent } from './detalle-pagos/detalle-pagos.component';
import { DetalleCuentaComponent } from './detalle-cuenta/detalle-cuenta.component';


const routes: Routes = [
  {
    path: 'dashboard', 
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'registrar-facturas', component: RegistrarFacturasComponent },
      { path: 'registrar-tarjetas', component: RegistrarTarjetasComponent },
      { path: 'ver-facturas', component: VerFacturasComponent },
      { path: 'ver-tarjetas', component: VerTarjetasComponent },
      { path: 'detalle-pagos', component: DetallePagosComponent },
      { path: 'detalle-cuenta', component: DetalleCuentaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
