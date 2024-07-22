import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {Agent} from "../../../../commons/interfaces/agent";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {SimpleWholesaler} from "../../../../commons/interfaces/simple-wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-agent-show',
    templateUrl: './agent-show.component.html',
    styleUrls: ['./agent-show.component.css']
})
export class AgentShowComponent {

    accountSlug: string | null
    operations: Operation[]
    agent$: Observable<Response<Agent>>
    wholesalers$: Observable<Response<SimpleWholesaler[]>>
    items: Breadcrumb[] = [
        {label: "Customers", routerLink: "/agent"},
        {label: "Details"}]

    titleCredit: string;
    titleAccount: string;
    titleRefund: string;

    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}
    Permissions = Permissions


    constructor(private router: Router,
                private route: ActivatedRoute,
                private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private breadcrumbService: BreadcrumbService,
                public  keycloakService: KeycloakService) {
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        const codeAgent = this.route.snapshot.paramMap.get('codeAgent')
        if (codeAgent != null) {
            this.titleCredit = "Customer-" + codeAgent + "_Credit_Request"
            this.titleRefund = "Customer-" + codeAgent + "_Refund_Request"
            this.titleAccount = "Customer-" + codeAgent + "_Account_operations"
            this.agent$ = this.agentService.show(this.route.snapshot.paramMap.get('codeAgent')).pipe(share())
            this.wholesalers$ = this.wholesalerService.getAll().pipe(share())
        }
    }

}
