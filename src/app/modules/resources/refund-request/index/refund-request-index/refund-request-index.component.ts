import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { Observable, share, NotFoundError } from 'rxjs';
import { CreditRequestStatus } from 'src/app/commons/enums/CreditRequestStatus';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { RefundRequestStatus } from 'src/app/commons/enums/RefundRequestStatus';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { navigateBack } from 'src/app/commons/helpers';
import { CreditRequest } from 'src/app/commons/interfaces/credit-request';
import { OverviewRefundRequest } from 'src/app/commons/interfaces/overview-refund-request';
import { PaginatedResource } from 'src/app/commons/interfaces/paginated-resource';
import { Response } from 'src/app/commons/models/response';
import { CreditRequestService } from 'src/app/services/credit-request.service';
import { RefundRequestService } from 'src/app/services/refund-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refund-request-index',
  templateUrl: './refund-request-index.component.html',
  styleUrls: ['./refund-request-index.component.css']
})
export class RefundRequestIndexComponent implements OnInit, OnChanges {

  @Input()
  codeAgent: any
  @Input()
  codeWholesaler: any
  @Input()
  title: string;
  page$: Observable<Response<PaginatedResource<OverviewRefundRequest>>>;
  allData$: Observable<any[]>
  exportHeaders: string[] = ['Credit Amount', 'Credit fees', 'Refund Amount', 'Status', 'Date creation'];
  exportFileName: string = ""
  Permissions = Permissions
  search = {
      startDate: '',
      endDate: '',
      status: ''
  }
  protected readonly RefundRequestStatus = RefundRequestStatus;

  constructor(public keycloakService: KeycloakService,
              private toastr: ToastrService,
              private refundRequestService: RefundRequestService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes) {
          this.exportFileName = this.title
          this.initExportData();
      }

  }

  ngOnInit(): void {
      this.goToPage()
  }

  initExportData() {
      this.allData$ = new Observable<any[]>(subscriber => {
          const source = this.refundRequestService.getAllRefundRequests(
              this.codeWholesaler,
              this.codeAgent,
              this.search.status,
              this.search.startDate,
              this.search.endDate)
          source.subscribe({
              next: response => {
                  const columns = response?.data.map((data: OverviewRefundRequest) => [data.creditRequest.amount, data.creditRequest.fees, data.amount, data.status, data.createdAt])
                  subscriber.next(columns)
              }
          })
      })
  }

  goToPage(page: number = 0) {
      this.page$ = this.refundRequestService.getRefundRequests(
          page, 
          5,
          this.codeWholesaler, 
          this.codeAgent,            
          this.search.status,
          this.search.startDate,
          this.search.endDate).pipe(share());

      this.page$.subscribe({
          error: (err: AppError) => {
              if (err instanceof NotFoundError)
                  this.router.navigate(['/not-found'])

              if (err instanceof ForbiddenError)
                  this.router.navigate(['/forbidden'])
          }
      })

  }

  public cancel(token: string) {
      Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to cancel this refund.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
      }).then((result) => {
          if (result.value) {
              this.refundRequestService.cancel(token).subscribe({
                  next: (response) => {
                      if (response.statusCode == 200) {
                          this.toastr.success('Refund canceled successfully', 'Success');
                          navigateBack(this.router)
                      } else {
                          this.toastr.error(response.message, 'Error');
                      }
                  },
                  error: (err: AppError) => {
                      this.toastr.error(err.originalError.message(), 'Error');
                  }
              })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancellation abort', 'The refund cancellation has been abort:)', 'error');
          }
      });
  }

  public validate(token: string) {
    
    this.refundRequestService.validateRefunds([token]).subscribe({
        next: (response) => {
            if (response.statusCode == 200) {
                this.toastr.success('Refund validated successfully', 'Success');
                navigateBack(this.router)
            } else {
                this.toastr.error(response.message, 'Error');
            }
        },
        error: (err: AppError) => {
            this.toastr.error(err.originalError.message(), 'Error');
        }
    })
}

  getColorClassForStatus(status: string): string {
    switch (status) {
        case 'VALIDATED':
            return 'bg-teal-100 text-teal-600';
        case 'INITIATED': // Add case for 'INITIATED' status
            return 'bg-purple-100 text-purple-600';
        case 'PAID':
            return 'bg-blue-100 text-blue-600';
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-600';
        case 'FAILED':
            return 'bg-red-100 text-red-600';
        case 'REJETE':
            return 'bg-orange-100 text-orange-600';
        default:
            return 'bg-gray-100 text-gray-600'; // Default color
    }
}
}
