import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.css']
})
export class ListaPagosComponent implements OnInit {

  public pagos:any[] = [];

  constructor(
              private pagosServ: PagosService
  ) { }

  ngOnInit(): void {
    this.getAllPagos();
  }


  /**
   * Método para obtener todos los pagos
   */
  public getAllPagos = () =>{

    this.pagosServ.getAllPagosService().subscribe( (resp:any) =>{

      this.pagos = resp.pagos || [];
      console.log(this.pagos)

    }, (err) =>{
      console.log(err)
    })

  }




}
