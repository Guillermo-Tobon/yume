import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterFrom } from '../interfaces/register-form.interface';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public httpOptions:any = {}; 
  public timeElapsed = Date.now();
  public today = new Date(this.timeElapsed);

  constructor( 
              private http: HttpClient,
              private router: Router
               ) {

    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };

   }


  /**
   * Método de servicio para crear usuarios
   * @param formData => Información del formulario
   */
  public crearUsuarioServices = ( formData: RegisterFrom ) =>{
    
    return this.http.post(`${BASE_URL}/crearUsuario`, formData, this.httpOptions).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }



  /**
   * Método de servicio para iniciar sesión
   * @param formData => Información del formulario
   */
  public loginServices = ( formData: LoginForm ) =>{
    
    return this.http.post(`${BASE_URL}/login`, formData, this.httpOptions).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }


  /**
   * Método para validar el token de autenticación
   */
  public validarToken = () =>{
    const token = localStorage.getItem('token') || '';
    if ( token ) {
      return true;

    } else {
      return false;
    }
  }



  /**
   * Metodo de servicio para crear la info del usuario
   * @param token => Token de autenticación
   */
  public crearInfoUsuarioService = ( token:string ) =>{

    const httpOptions2 = { headers: new HttpHeaders({'Content-Type':  'application/json', 'x-token': token}) };
    const json = {
              nombre: "Guillermo Barco",
              tipoIdentifica: "Temporal",
              numIdentifica: "Temporal",
              ciudad: "Temporal",
              fechNacimiento: "0000-00-00",
              genero: "Temporal",
              direccion: "Temporal",
              activEconomica: "Temporal",
              ingresos: "Temporal",
              egresos: "Temporal",
              activos: "Temporal",
              pasivos: "Temporal",
              patrimonios: "Temporal",
              pep: "Temporal",
              fechRegistro: this.today.toISOString(),
          }
    
    return this.http.post(`${BASE_URL}/crearInfoUsuarios`, json, httpOptions2).pipe(
      map( resp => resp )
    );

  }



  /**
   * Metodo de servicio para obtener la info  del usuario
   * @param uid => ID del usuario logueado
   * @param token => Token de autenticación
   */
  public getInfoUserService = (uid: string, token: string) =>{
    const httpOptions2 = { headers: new HttpHeaders({'Content-Type':  'application/json', 'x-token': token}) };

    return this.http.get(`${BASE_URL}/infoUsuarioById/${uid}`, httpOptions2).pipe(
      map( resp => resp ),
      tap( (resp:any) =>{
        localStorage.setItem('infoUsuario', JSON.stringify(resp));
      })
    );

  }



  public logoutServices = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('infoUsuario');
    this.router.navigateByUrl('/login');
  }

  
}
