import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SystemCurrency } from 'src/app/commons/enums/SystemCurrency';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.css']
})
export class CurrencyDropdownComponent {

  @Output() onCurrencyChange = new EventEmitter<SystemCurrency>() 
  SystemCurrency =Object.values(SystemCurrency) 
  @Input() title = 'Currency'
  @Input() selectedCurrency : SystemCurrency

  changeCurrency($event: any) {
    console.log($event.target.value);
    
    this.onCurrencyChange.emit($event.target.value)
  }
}
