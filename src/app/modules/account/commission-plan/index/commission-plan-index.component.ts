import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {Router} from "@angular/router";
import {CommissionPlanService} from "../../../../services/commission-plan.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {CommissionPlan} from "../../../../commons/interfaces/commission-plan";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {KeycloakService} from "keycloak-angular";
import { Permissions } from 'src/app/commons/enums/Permissions';
import { navigateBack } from 'src/app/commons/helpers';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-commission-plan-index',
    templateUrl: './commission-plan-index.component.html',
    styleUrls: ['./commission-plan-index.component.css']
})
export class CommissionPlanIndexComponent implements OnInit, OnChanges {

    page: PaginatedResource<CommissionPlan> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: false
    }
    page$: Observable<Response<PaginatedResource<CommissionPlan>>>;


    @Input()
    code: string

    @Input()
    type: string
    @Input()
    title: string
    allData$: Observable<any[]>
    exportHeaders: string[] = ['Type', 'Start Amount', 'End Amount', 'Fees fix', 'Fees percentage', 'Commission System', 'Commission Lender', 'Commission Aggregator', 'Commission Wholesaler'];
    exportFileName: string;
    Permissions = Permissions

    constructor(private commissionPlanService: CommissionPlanService,
                public keycloakService: KeycloakService,
                private router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);

        this.exportFileName = this.title;
        this.initExportData();
    }

    ngOnInit(): void {
        this.goToPage()
    }

    initExportData() {
        this.allData$ = new Observable<any[]>(subscriber => {
            const source = this.commissionPlanService.getAllList(this.code, this.type)
            source.subscribe({
                next: response => {
                    const columns = response.data.map((data: CommissionPlan) => [data.operationType, data.startAmount, data.endAmount, data.feesFix, data.feesPercentage, data.commissionSystem, data.commissionLender, data.commissionAggregator, data.commissionWholesaler])
                    subscriber.next(columns)
                }
            })
        })
    }

    goToPage(page: number = 0) {
        this.page$ = this.commissionPlanService.getAll(this.code, this.type, page).pipe(share());
        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })

    }

    confirmDelete(id: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this commission  plan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.value) {
                // Call your delete function here
                this.delete(id);
                Swal.fire('Deleted!', 'This commission plan has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'This commission plan is safe :)', 'error');
            }
        });
      }
    
      delete(id: number) {
        this.commissionPlanService.delete(id).subscribe({
            next: (response: any) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
        })
      }
}
