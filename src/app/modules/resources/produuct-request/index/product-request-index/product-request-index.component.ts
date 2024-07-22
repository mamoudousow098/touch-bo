import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { NotFoundError, Observable, share } from 'rxjs';
import { CreditRequestStatus } from 'src/app/commons/enums/CreditRequestStatus';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { CreditRequest } from 'src/app/commons/interfaces/credit-request';
import { OverviewCreditRequestProduct } from 'src/app/commons/interfaces/overview-credit-request-product';
import { PaginatedResource } from 'src/app/commons/interfaces/paginated-resource';
import { Response } from 'src/app/commons/models/response';
import { CreditRequestService } from 'src/app/services/credit-request.service';

@Component({
  selector: 'app-product-request-index',
  templateUrl: './product-request-index.component.html',
  styleUrls: ['./product-request-index.component.css']
})
export class ProductRequestIndexComponent implements OnInit, OnChanges {

  @Input()
  codeFournisseur: any
  @Input()
  title: string;
  page$: Observable<Response<PaginatedResource<OverviewCreditRequestProduct>>>;
  allData$: Observable<any[]>
  exportHeaders: string[] = ['Type', 'Amount', 'Status', 'Outstanding Balance', 'Recovered amount', 'Fees', 'Date creation'];
  exportFileName: string = ""
  Permissions = Permissions
  search = {
      codeProduct: '',
      codeCategory: '',
      codeAgent: '',
      codeFournisseur: '',
      startDate: '',
      endDate: '',
      status: ''
  }
  protected readonly CreditRequestStatus = CreditRequestStatus;

  constructor(public keycloakService: KeycloakService,
              private toastr: ToastrService,
              private creditRequestService: CreditRequestService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes) {
          this.exportFileName = this.title
          this.initExportData();
      }
      this.search.codeFournisseur=this.codeFournisseur

  }

  ngOnInit(): void {
      this.goToPage()
  }

  initExportData() {
      this.allData$ = new Observable<any[]>(subscriber => {
          const source = this.creditRequestService.getAllCreditRequestsProducts(
              this.search.codeAgent,
              this.search.codeCategory,
              undefined,
              this.search.status,
              this.search.startDate,
              this.search.endDate)
          source.subscribe({
              next: response => {
                  const columns = response?.data.map((data: CreditRequest) => [data.type, data.amount, data.status, data.outstandingBalance, data.recoveredAmount, data.fees, data.createdAt])
                  subscriber.next(columns)
              }
          })
      })
  }

  goToPage(page: number = 0) {
      this.page$ = this.creditRequestService.getCreditRequestsProduct(
          page, 
          5, 
          this.search.codeProduct,
          this.search.codeAgent,
          this.search.codeCategory,            
          undefined,
          this.search.status,
          this.search.startDate,
          this.search.endDate,
          this.search.codeFournisseur).pipe(share());

      this.page$.subscribe({
          error: (err: AppError) => {
              if (err instanceof NotFoundError)
                  this.router.navigate(['/not-found'])

              if (err instanceof ForbiddenError)
                  this.router.navigate(['/forbidden'])
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
