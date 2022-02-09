import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import {NgZone} from '@angular/core'
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, map, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;
  constructor(private http:HttpClient,private router:Router, private ngZone:NgZone) {
    this.googleInit();
   }

  googleInit(){
    return new Promise<void>(resolve =>{
      
      gapi.load('auth2',()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '720725280790-a37ecur1o0k5ctq2lnpml9rav1r6os4g.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
   }
   logout(){
     localStorage.removeItem('token');
     
     this.auth2.signOut().then(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
      
      //console.log('User signed out.');
    });
   }

   validarToken():Observable<boolean>{
     const token = localStorage.getItem('token') || '';
      return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
     }).pipe(
       tap( (response:any) => {
        localStorage.setItem('token',response.token)
       }),
       map(response => true),
       catchError(error => of(false))
     );
   }


   crearUsuario(formData:RegisterForm):Observable<Usuario>{
       
      return this.http.post<Usuario>(`${base_url}/usuarios`, formData)
                  .pipe(
                    tap((response:any) => {
                      localStorage.setItem('token',response.token)
                    })
                  );
   }
   login(formData:LoginForm):Observable<Usuario>{
       
    return this.http.post<Usuario>(`${base_url}/login`, formData)
               .pipe(
                 tap((response:any) => {
                   localStorage.setItem('token',response.token)
                 })
               );
     }
     loginGoogle(token:any):Observable<Usuario>{
      return this.http.post<Usuario>(`${base_url}/login/google`, {token})
      .pipe(
        tap((response:any) => {
          localStorage.setItem('token',response.token)
        })
      );
     }  


  }
