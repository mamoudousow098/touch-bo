import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyFrPipePipe } from './currencyPipe/custom-currency-fr-pipe.pipe';



@NgModule({
  declarations: [
    CustomCurrencyFrPipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomCurrencyFrPipePipe
  ]
})
export class CustomPipeModule { }
