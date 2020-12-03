import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  
  //Grafica 1
  public lblGrafica1: string[] = ['Factura 1', 'Factura 2', 'Factura 3'];
  public Data1 = [ [350, 450, 100] ];

  //Grafica 2
  public meses: string[] = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; 
  public DataBarra: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Serv. Públicos' },
    { data: [28, 48, 40, 19, 86, 27, 100], label: 'T. Crédito' },
    { data: [18, 68, 20, 9, 46, 67, 50], label: 'Otros Pagos' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
