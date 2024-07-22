import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';


@Pipe({
  name: 'customCurrencyFrPipe',
})
export class CustomCurrencyFrPipePipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

    transform(value: any, currencyCode?: string, display?: string | boolean, digitsInfo?: string, locale?: string): string {
        if (value != null){

          value = this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
          console.log("Value here:" + value);
          
          value = value.toString().replace(/,/g, '.');
          value = value.toString().split(/\s+/).join(',');
          // Find the index of the last , before "XOF"
          let lastSpaceIndex = value.lastIndexOf(',');
          let beforeCurrencyCode = value.substring(0, lastSpaceIndex);
          let currencyCodePart = value.substring(lastSpaceIndex + 1);
          if(currencyCode == null)
            return beforeCurrencyCode
          return beforeCurrencyCode + ' ' + currencyCodePart;
        }
        return '0.00';
    }

}
