import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

public labels1:string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
public data1: ChartData<'doughnut'> = {
  labels: this.labels1,
  datasets:[
    {data:[950,450,100]}
  ]
};


}
