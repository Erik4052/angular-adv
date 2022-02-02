import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(){
   /*  this.getUsuarios(); */
/* 
    const promesa = new Promise((resolve, reject) => {
      if(false){
        resolve('Hola mundo');
      } else{
        reject('Algo salió mal')
      }
        
        

    });
    promesa.then((mensaje) => {
      console.log(mensaje);
      
    })
    .catch(error => console.log('Error en mi promesa', error)
    )      
      console.log('Fin del init');
 */

  }

  /* getUsuarios(){
    fetch('https://reqres.in/api/users?page=2')
    .then( response => console.log(response.json))
    .then(data => console.log(data)
    )
  }
 */
}
