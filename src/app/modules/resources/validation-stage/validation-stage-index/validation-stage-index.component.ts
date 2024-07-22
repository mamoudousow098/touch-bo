import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NotFoundError, Observable, share } from 'rxjs';
import { Permissions } from 'src/app/commons/enums/Permissions';
import { AppError } from 'src/app/commons/errors/app-error';
import { ForbiddenError } from 'src/app/commons/errors/forbidden-error';
import { navigateBack } from 'src/app/commons/helpers';
import { PaginatedResource } from 'src/app/commons/interfaces/paginated-resource';
import { Response } from 'src/app/commons/models/response';
import { ValidationStage } from 'src/app/interface/validation-stage';
import { ValidationStageService } from 'src/app/services/validation-stage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation-stage-index',
  templateUrl: './validation-stage-index.component.html',
  styleUrls: ['./validation-stage-index.component.css']
})
export class ValidationStageIndexComponent {

  page: PaginatedResource<ValidationStage> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    first: true,
    last: false
}
page$: Observable<Response<ValidationStage[]>>;


@Input()
code: string

Permissions = Permissions

constructor(private validationStageService: ValidationStageService,
            public keycloakService: KeycloakService,
            private router: Router) {
}

ngOnInit(): void {
    this.goToPage()
}



goToPage(page: number = 0) {
    this.page$ = this.validationStageService.getAllValidationStage(this.code).pipe(share());
    this.page$.subscribe({
        error: (err: AppError) => {
            if (err instanceof NotFoundError)
                this.router.navigate(['/not-found'])

            if (err instanceof ForbiddenError)
                this.router.navigate(['/forbidden'])
        }
    })

}

confirmDelete(code: string) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this validation Stage',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.value) {
            // Call your delete function here
            this.delete(code);
            Swal.fire('Deleted!', 'This validation stage has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'This validation stage is safe :)', 'error');
        }
    });
  }

  delete(codeValidation: string) {
    this.validationStageService.delete(codeValidation).subscribe({
         next: (response: any) => {
             if (response.statusCode == 200)
                 navigateBack(this.router)
         },
     })
  }

}
