import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('Erik Ruben', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('erik1999@live.com.mx', [Validators.required, Validators.email]),
    password: new FormControl('12345', [Validators.required,]),
    password2: new FormControl('12345', [Validators.required]),
    terminos: new FormControl(false, Validators.required)
  },);/* {
    validators: this.passwordsIguales('password', 'password2'), 
  } as AbstractControlOptions ); */
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router:Router) { }


  crearUsuario() {
    this.formSubmitted = true;
    //console.log(this.registerForm.value);
    console.log(this.registerForm);

    if(this.registerForm.valid && !this.contrasenasNoValidas()){
      
      this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(response => {
          //console.log(response);
          //console.log('usuario creado');
          this.router.navigateByUrl('/');
        }, (err) => {
          //si sucede un error
          Swal.fire('Error', err.error['msg'], 'error');
        });
      
    }else{
      this.registerForm.controls['password2'].setErrors({NoEsIgual:true})
    }
    //console.log(this.registerForm.valid);
    /* if (!this.registerForm.invalid) {
      return;
    }


 */



  }
  campoNoValido(campo: string): boolean {
    //console.log(this.registerForm);
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }
  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
    //console.log(this.registerForm.get('terminos')?.value);


  }
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control === pass2Control) {

        pass2Control?.setErrors(null)

      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }

    }
  }

}
