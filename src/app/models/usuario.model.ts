import { environment } from "src/environments/environment"

const api_url = environment.base_url;
environment
export class Usuario {
    constructor(
         public nombre:string,
         public email:string,
         public password?:string,
         public google?:boolean,
         public img?:string,
         public role?: string,
         public uid? :string,
    ){

    }
     /* imprimirUsuario(){
        console.log(this.img);
        
    }  */
    get imagenUrl(){
        // /upload/usuarios/no-image
        if(this.img?.includes('https')){
            return this.img;
        }
        if(this.img){
            return `${api_url}/upload/usuarios/${this.img}`;
        }else{
            return `${api_url}/upload/usuarios/noImg.jpg`;
        }
    
    }

}