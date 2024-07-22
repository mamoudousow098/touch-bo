import {Component, OnDestroy, OnInit} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {share, Subscription} from 'rxjs';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

    itemsSubscription: Subscription;
    homeSubscription: Subscription;

    items: Breadcrumb[] = null;
    home: Breadcrumb;

    constructor(public breadcrumbService: BreadcrumbService, private router: Router) {
        this.itemsSubscription = breadcrumbService.itemsHandler.pipe(share()).subscribe(response => {
            this.items = response;
            console.log(response);
        });

        this.homeSubscription = breadcrumbService.homeHandler.pipe(share()).subscribe(response => {
            this.home = response;
            console.log(response);

        });

    }

    ngOnInit(): void {

    }

    ngOnDestroy() {
        if (this.itemsSubscription) {
            this.router.events.subscribe((event: Event) => {
                if (event instanceof NavigationEnd) {
                    console.log(this.itemsSubscription)
                    this.breadcrumbService.setItems(null)
                    this.itemsSubscription.unsubscribe();
                }
            })

        }

        if (this.homeSubscription) {
            this.router.events.subscribe((event: Event) => {
                if (event instanceof NavigationEnd) {
                    console.log(this.itemsSubscription)
                    this.breadcrumbService.setHome(null)
                    this.homeSubscription.unsubscribe();
                }
            })

        }
    }
}
