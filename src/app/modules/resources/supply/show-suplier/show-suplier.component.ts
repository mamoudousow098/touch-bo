import { Component } from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {Observable, share} from "rxjs";
import {Response} from "../../../../commons/models/response";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {ActivatedRoute, Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {BreadcrumbService} from "../../../../commons/services/breadcrumb.service";
import {DashboardService} from "../../../../services/dashboard.service";
import {AppError} from "../../../../commons/errors/app-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {SupplierService} from "../../../../services/supplier.service";
import {Fournisseur} from "../../../../commons/interfaces/suplier";
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
  selector: 'app-show-suplier',
  templateUrl: './show-suplier.component.html',
  styleUrls: ['./show-suplier.component.css']
})
export class ShowSuplierComponent {
    supplier$: Observable<Response<Fournisseur>>

    items: Breadcrumb[] = [
        {label: "Suppliers", routerLink: '/supplier'},
        {label: "Details"}
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    Permissions = Permissions


    constructor(private router: Router, private route: ActivatedRoute,
                private supplierService: SupplierService,
                public keycloakService: KeycloakService,
                private breadcrumbService: BreadcrumbService,
                private dashboardService: DashboardService) {

    }


    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        const codeFournisseur = this.route.snapshot.paramMap.get('codeFournisseur')
        if (codeFournisseur != null) {
            this.supplier$ = this.supplierService.show(codeFournisseur).pipe(share())
            this.supplier$
                .subscribe({
                    error: (err: AppError) => {
                        if (err instanceof BadRequestError)
                            this.router.navigate(['/not-found'])
                        if (err instanceof ForbiddenError)
                            this.router.navigate(['/forbidden'])
                    }
                })
        }
    }

}
