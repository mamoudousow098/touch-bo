import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginatedResource} from "../../../commons/interfaces/paginated-resource";

@Component({
    selector: 'app-shared-paginated-resource',
    templateUrl: './paginated-resource.component.html',
    styleUrls: ['./paginated-resource.component.css']
})
export class PaginatedResourceComponent {
    @Input()
    page: PaginatedResource<any>

    @Output()
    pageChange: EventEmitter<any> = new EventEmitter();

    changeToPage(number: number) {
        this.pageChange.emit({number})
    }
}
