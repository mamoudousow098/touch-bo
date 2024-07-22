import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NotFoundError, Observable, share } from 'rxjs';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { navigateBack } from 'src/app/commons/helpers';
import { ApiResponse } from 'src/app/commons/interfaces/api-response';
import { PaginatedResource } from 'src/app/commons/interfaces/paginated-resource';
import { Response } from 'src/app/commons/models/response';
import { CurrencyRate } from 'src/app/interface/currency-rate';
import { CurrencyRateService } from 'src/app/services/settings/currency-rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css']
})
export class CurrencyRateComponent implements OnInit {
  page$: Observable<Response<PaginatedResource<CurrencyRate>>>
  Permissions = Permissions

  constructor(private currencyRateService: CurrencyRateService,
              private router: Router,
              public keycloakService: KeycloakService){}

  ngOnInit(): void {
    this.goToPage()
  }

  goToPage(page: number = 0) {
    this.page$ = this.currencyRateService.getPage(page).pipe(share())
    this.page$.subscribe({
        error: (err: AppError) => {
            if (err instanceof NotFoundError)
                this.router.navigate(['/not-found'])

            if (err instanceof ForbiddenError)
                this.router.navigate(['/forbidden'])
        }
    })
}

  confirmDelete(codeCurrencyRate: string) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this currency  rate',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.value) {
            // Call your delete function here
            this.delete(codeCurrencyRate);
            Swal.fire('Deleted!', 'This currency rate has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'This currency rate is safe :)', 'error');
        }
    });
  }

  delete(codeCurrencyRate: string) {
    this.currencyRateService.delete(codeCurrencyRate).subscribe({
        next: (response: any) => {
            if (response.statusCode == 200)
                navigateBack(this.router)
        },
        error: (err: any) => console.log('code lender delete error', err)
    })
  }
}
