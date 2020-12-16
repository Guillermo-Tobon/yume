import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public dataInfoUser:any[] = [];
  public avatar: string = environment.base_url;  
  public nombre:string = '';

  constructor( private usuarioSrv: UsuarioService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataInfoUser = JSON.parse(localStorage.getItem('infoUsuario'));

      this.avatar = `${this.avatar}/${this.dataInfoUser['infoUserDB'][0]['usuario']['img']}`;
      this.nombre = this.dataInfoUser['infoUserDB'][0]['usuario']['nombre'];
    }, 500);
  }


  /**
   * Método para cerrar sesión
   */
  public cerrarSesion = () =>{
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Sesión Cerrada!','Te esperamos pronto.','success');
        setTimeout(() => { this.usuarioSrv.logoutServices(); }, 1000);
      }
    });
  }

}
