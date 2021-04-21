import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FinanzasService } from 'src/app/services/finanzas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-ingresos',
  templateUrl: './lista-ingresos.component.html',
  styleUrls: ['./lista-ingresos.component.css']
})
export class ListaIngresosComponent implements OnInit {

  public finanza:any[] = [];
  public ingresos:any[] = [];
  public formCrearIngreso:FormGroup;
  public formEditarIngreso:FormGroup;
  public formSubmitted:boolean = false;

  constructor(
              private finanzasServ: FinanzasService,
              private location: Location,
              private fb: FormBuilder,
              private router: Router,

  ) { }

  ngOnInit(): void {
    
    this.finanza = JSON.parse(localStorage.getItem('finanzas')) || [];

    this.getIngresosById(this.finanza[0].id_us);
    this.iniciarFormulario();
  }


  /**
  * Método para obtener los ingresos por usuario
  * @param idUs => ID del usuario
  */
  public getIngresosById = (idUs:any) =>{
    this.finanzasServ.getIngresosByIdService(idUs).subscribe( (resp:any) =>{

      this.ingresos = resp.ingresos || [];

    }, (err) =>{ console.error(err)})
  }



  /**
   * Método para insertar ingresos
   */
  public crearIngreso = () =>{
    this.formSubmitted = true;

    if ( this.formCrearIngreso.invalid ) {
      return;
    }
    
    const json = {
      idUs: this.finanza[0].id_us,
      idFina: this.finanza[0].id_fina,
      valor: this.formCrearIngreso.get('valor').value,
      comentario: this.formCrearIngreso.get('comentario').value,
      pagoCredito: this.formCrearIngreso.get('pagoCredito').value == true? 1 : 0
    }
    this.finanzasServ.insertIngresosService(json).subscribe( (resp:any) =>{

      Swal.fire('Bien!', resp.msg, 'success');
      setTimeout(() => { window.location.reload(); }, 2000);

    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
    })
  }



  /**
   * Método para iniciar formulario
   */
  public iniciarFormulario = () =>{
    this.formCrearIngreso = this.fb.group({
      valor: ['', [Validators.required, Validators.minLength(3)]],
      comentario: ['', [Validators.required, Validators.minLength(5)]],
      pagoCredito: [],
    })

    this.formEditarIngreso = this.fb.group({
      valor: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [Validators.required]],
      comentario: ['', [Validators.required, Validators.minLength(5)]],
      idIngreso: ['', [Validators.required]],
      pagoCredito: [],
    })
  }



  /**
   * Método para abrir modal con ingreso
   * @param ingreso => Objeto con ingreso
   */
  public modalEditarIngreso = (ingreso:any) => {
    const fecha = ingreso.fecha_ingre.split('T');
    this.formEditarIngreso = this.fb.group({
      valor: [ingreso.valor_ingre, [Validators.required, Validators.minLength(3)]],
      fecha: [fecha[0], [Validators.required]],
      comentario: [ingreso.comentario_ingre, [Validators.required, Validators.minLength(5)]],
      idIngreso: [ingreso.id_ingre, [Validators.required]],
      pagoCredito: [ingreso.pago_credito_ingre == 1? true: false],
    })

  }



  /**
   * Método para editar el ingreso
   */
  public editarIngresoById = () =>{

    this.finanzasServ.updateIngresoService(this.formEditarIngreso.value).subscribe( (resp:any) =>{

      Swal.fire('Bien!', resp.msg, 'success');
      setTimeout(() => { window.location.reload() }, 1500);

    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
    })
  }


  /**
   * Método para eliminar el ingreso
   * @param idIngreso => ID del ingreso a eliminar
   */
  public EliminarIngreso = (idIngreso:any) =>{
    Swal.fire({
      title: '¿Desea eliminar el ingreso?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.finanzasServ.deleteIngresoService(idIngreso).subscribe( (resp:any) =>{
          Swal.fire('Bien!',resp.msg,'success');
          setTimeout(() => { window.location.reload(); }, 1500);

        }, (err) =>{
          Swal.fire('Error!',err.error.msg,'error');
          
        })

      }
    });
  }



  /**
   * Método para validar los campos del formulario
   * @param campo => Campo a validar
   */
  public campoNoValido = (campo:any): boolean =>{
    if ( this.formCrearIngreso.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }




  goBack(){
    this.location.back();
  }

}
