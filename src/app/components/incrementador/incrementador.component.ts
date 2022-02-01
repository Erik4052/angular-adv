import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

   @Input('valor') progreso:number = 80;
   @Input() btnClass:string = 'btn-primary';


   @Output('valor') valorSalida: EventEmitter<number> =  new EventEmitter();
  /* @Input() progreso:number = 80; */
  ngOnInit(): void {
      this.btnClass = `btn ${this.btnClass}`
  }
  
/*   get getPorcentaje(){
    return `${this.progreso}%`;
  } */
 
  cambiarValor(valor:number){
    if(this.progreso>=100 && valor>=0){
     this.valorSalida.emit(100);
     this.progreso = 100;
     return;
    }
    if(this.progreso<= 0 && valor<=0){
     this.valorSalida.emit(0);
     this.progreso = 0;
     return; 
    }
   this.progreso = this.progreso + valor;
   this.valorSalida.emit(this.progreso);
  }

  onChange(event:number){
    if(event>=100){
      this.progreso = 100;

    }else if (event<=0){
      this.progreso = 0;
    }else{
      this.progreso = event;
    }
      
    this.valorSalida.emit(this.progreso);
    
  }
}
