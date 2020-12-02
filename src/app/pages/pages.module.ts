import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrarFacturasComponent } from './registrar-facturas/registrar-facturas.component';
import { VerFacturasComponent } from './ver-facturas/ver-facturas.component';
import { RegistrarTarjetasComponent } from './registrar-tarjetas/registrar-tarjetas.component';
import { VerTarjetasComponent } from './ver-tarjetas/ver-tarjetas.component';
import { DetallePagosComponent } from './detalle-pagos/detalle-pagos.component';
import { DetalleCuentaComponent } from './detalle-cuenta/detalle-cuenta.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    RegistrarFacturasComponent,
    VerFacturasComponent,
    RegistrarTarjetasComponent,
    VerTarjetasComponent,
    DetallePagosComponent,
    DetalleCuentaComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ChartsModule
  ]
})
export class PagesModule { }
