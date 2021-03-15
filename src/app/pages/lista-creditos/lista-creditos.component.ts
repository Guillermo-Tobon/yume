import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CreditosService } from 'src/app/services/creditos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-creditos',
  templateUrl: './lista-creditos.component.html',
  styleUrls: ['./lista-creditos.component.css']
})
export class ListaCreditosComponent implements OnInit {

  public creditos:any[] = [];

  constructor(
              private creditosServ: CreditosService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllCreditos()
  }


  public getAllCreditos = () =>{
    this.creditosServ.getAllCreditosService().subscribe( (resp:any) =>{

      this.creditos = resp.creditos || [];
      console.log(this.creditos)

    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
    })
  }



  /**
   * Método para navegar a ver crédito
   * @param idUs => ID del cliente
   */
  public navegarVerCredito = (idUs:any) =>{
    this.router.navigate(['dashboard/detalle-credito', idUs]);
  }




}
