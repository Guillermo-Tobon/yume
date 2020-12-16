import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public completeInfo:boolean = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('remember') || '', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
    remember: [false]
  });

  constructor( 
              private router: Router,
              private fb: FormBuilder,
              private usuarioSrv: UsuarioService 
              ) { }

  ngOnInit(): void {
  }


  /**
   * Método para iniciar sesión
   */
  public Login = async() =>{

    await this.usuarioSrv.loginServices( this.loginForm.value ).subscribe( resp =>{

      //Obtenemos la información del usuario logueado
      this.usuarioSrv.getInfoUserService( resp.usuarioDB.uid, resp.token ).subscribe( data =>{
        
        this.completeInfo = data.infoUserDB[0].usuario.completeInfo;
        if ( this.completeInfo ) {
          Swal.fire('Hola!', data.infoUserDB[0].usuario.nombre, 'success');
          
        } else {
          Swal.fire('Hola!', data.infoUserDB[0].usuario.nombre+'. Por favor no olvides completar tu cuenta para poder utilizar por completo VelaPay.', 'success');
        }

      });
      
      if( this.loginForm.get('remember').value ){
        localStorage.setItem('remember', this.loginForm.get('email').value);
        
      } else {
        localStorage.removeItem('remember');
      }

      this.router.navigateByUrl('/');

    }, ( err ) =>{
      Swal.fire('Error', err.error.msg, 'error');
    });
  }




}
