import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor( 
              private usuarioSrv: UsuarioService,
              private router: Router ){}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      const resp = this.usuarioSrv.validarToken();
      if( !resp ){
        this.router.navigateByUrl('/login');
      }
      return resp;
  }
  
}
