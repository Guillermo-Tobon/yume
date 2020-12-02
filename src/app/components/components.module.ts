import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { Grafica1Component } from './grafica1/grafica1.component';



@NgModule({
  declarations: [
    Grafica1Component
  ],
  exports: [
    Grafica1Component
  ],
  imports: [
    CommonModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
