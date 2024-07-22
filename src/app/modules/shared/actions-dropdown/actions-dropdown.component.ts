import {AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html',
    styleUrls: ['./actions-dropdown.component.css']
})
export class ActionsDropdownComponent implements AfterViewInit, OnChanges {
    hide: boolean = true;
    @ViewChild('container') menuButtonContainer: ElementRef | undefined;

    constructor(private elementRef: ElementRef) {
    }

    toggleDisplay() {
        this.hide = !this.hide
        this.handlepointerLeave();

        console.log(this.menuButtonContainer);
    }


    ngAfterViewInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);

    }

    private handlepointerLeave(): void {
        if (!this.hide && this.menuButtonContainer) {
            // Add touchmove event listener for the specific div
            const targetElement = this.menuButtonContainer.nativeElement;


            console.log("target", targetElement);

            // Check if the device is a touchscreen device
            var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (isTouchDevice) {
                console.log("here");

                // If it's a touch device, use touchmove event
                document.addEventListener('touchstart', (ev: TouchEvent) => this.onTouchStart(ev, this.menuButtonContainer));
            } else {
                console.log("hereAA");

                // If it's not a touch device, use pointermove event
                targetElement.addEventListener('pointerleave', () => {
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
            console.log('Touched outside the element');
        }
    }

}
