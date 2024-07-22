import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditMetrics } from 'src/app/commons/interfaces/creditMetrics';
import { Response } from 'src/app/commons/models/response';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css']
})
export class MetricCardComponent implements OnChanges{
  

  @Input() title : string;
  @Input() metric$: Observable<CreditMetrics>;
  @Input() currency: string

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.metric$, this.metric$.subscribe({
      next: (response: CreditMetrics)=> console.log("----------RESPONSE---------", response, response.flux)
    }
      
    ));
    
  }

}


