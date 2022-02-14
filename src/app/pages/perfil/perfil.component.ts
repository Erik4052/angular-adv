import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public usuario!:Usuario;
  public imagenSubir!:File;
  public imgTemp:any = '';

 public perfilForm: FormGroup = new FormGroup({})
  constructor(private usuarioService:UsuarioService,private fileUploadService:FileUploadService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
     this.perfilForm = new FormGroup({
      email: new FormControl( this.usuario.email, [Validators.required,Validators.email]),
      nombre: new FormControl( this.usuario.nombre, [Validators.required]),
      
    });

  }
  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe(response => {
        const {nombre,email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');    
        }, (err) => {
          Swal.fire('Error', err.error['msg'], 'error');
          
        });
    
  }
  cambiarImagen(event:any){
    const file = event.target.files[0];
    this.imagenSubir = file;
    //console.log(file);

    if(!file){
       this.imgTemp = null;
       return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      //console.log(reader.result);
    }
    
  }
  subirImagen(){
    this.fileUploadService
        .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
        .then(img => {
          this.usuario.img = img,
          Swal.fire('Guardado', 'Imagen guardada', 'success');
        }).catch(err =>{
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
        
  }

}
