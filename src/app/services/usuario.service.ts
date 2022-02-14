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
  public usuario!: Usuario;
  constructor(private http:HttpClient,private router:Router, private ngZone:NgZone) {
    this.googleInit();
   }
   get token():string{
    return localStorage.getItem('token') || ''
   }
   get uid():string{
     return this.usuario.uid || '';
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
     
      return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
     }).pipe(
       map( (response:any) => {
         const {
           email,
           google,
           nombre,
           role,
           img = '',
           uid
         } = response.usuario;
         this.usuario = new Usuario(nombre,email,'',google,img,role,uid);
         //this.usuario.imprimirUsuario();
         //console.log(this.usuario);
         localStorage.setItem('token',response.token);
         return true;
       }),
       
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

  actualizarPerfil(data:{email:string,nombre:string,role:string}):Observable<any>{
    data = {
      ...data,
      role:this.usuario.role || ''
    };
    return this.http.put<any>(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
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
