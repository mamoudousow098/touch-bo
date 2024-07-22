import {Component} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {

    showMobileSideBar = false

    toggleMobileSideBar() {
        this.showMobileSideBar = !this.showMobileSideBar
    }
}
