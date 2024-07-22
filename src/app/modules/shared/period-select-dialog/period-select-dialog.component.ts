import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-period-select-dialog',
  templateUrl: './period-select-dialog.component.html',
  styleUrls: ['./period-select-dialog.component.css']
})
export class PeriodSelectDialogComponent implements OnInit{
 

  period: number
  @Input() defaultPeriod:number
  @Input() ever=false
  @Output() onPeriodChange = new EventEmitter<number>()
  hide = true;
  @ViewChild('container') menuButtonContainer: ElementRef | undefined;

  ngOnInit(): void {
    this.period = this.defaultPeriod
  }

  toggleDisplay() {
    this.hide = !this.hide
    this.handlepointerLeave();
  }

  changePeriod(period:number){
    this.period = period
    console.log(period);
    this.onPeriodChange.emit(period)
    this.hide = true
  }

  private handlepointerLeave(): void {
    if(this.hide && this.menuButtonContainer){
        // Add touchmove event listener for the specific div
        const targetElement = this.menuButtonContainer.nativeElement;
        // Check if the device is a touchscreen device
        var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice) {
            // If it's a touch device, use touchmove event
            document.addEventListener('touchstart', (ev: TouchEvent)=>this.onTouchStart(ev,this.menuButtonContainer));
        } else {
            // If it's not a touch device, use pointermove event
            targetElement.addEventListener('pointerleave', ()=>{
                console.log("pointerleave", targetElement);
                this.hide = !this.hide
            });
        }
        }
  }

  private onTouchStart(event: TouchEvent, element: ElementRef) {
    const targetElement = event.target as HTMLElement;
    const isTouchInside = element.nativeElement.contains(targetElement);

    if (!isTouchInside && !this.hide) {
      // Touch occurred outside the element
      this.hide = !this.hide
    }
  }
}
