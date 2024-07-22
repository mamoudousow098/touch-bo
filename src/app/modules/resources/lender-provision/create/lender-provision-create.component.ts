import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderProvisionService} from "../../../../services/lender-provision.service";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import { KeycloakService } from 'keycloak-angular';
import { Permissions } from 'src/app/commons/enums/Permissions';

@Component({
    selector: 'app-lender-provision-create',
    templateUrl: './lender-provision-create.component.html',
    styleUrls: ['./lender-provision-create.component.css']
})
export class LenderProvisionCreateComponent {
    displayModal: any;
    form: FormGroup
    formDisabled = false


    @ViewChild('submitBtn')
    submitBtn: ElementRef;

    @Input()
    codeLender: string

    files: File[] = [];
    Permissions = Permissions

    constructor(private provisionRequestService: LenderProvisionService, private router: Router, public keycloakService: KeycloakService) {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
            files: new FormControl('', Validators.required),
        })

        this.codeLender = ''
        this.displayModal = false
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    create() {
        this.submitBtn.nativeElement.disabled = true
        this.formDisabled = true
        this.provisionRequestService.create(
            this.codeLender,
            this.form.get('amount')?.value,
            this.files,
        ).subscribe({
            next: (response) => {
                this.files = [];
                navigateBack(this.router)
            },
            error: (err: AppError) => {
                handleFormError(err, this.form)
                this.formDisabled = true
            }
        })
    }

    onSelect($event: NgxDropzoneChangeEvent) {
        console.log($event);
        this.form.get('files').setValue($event.addedFiles)
        this.files.push(...$event.addedFiles);
        console.log(this.form.value);
    }

    onRemove(file: File) {
        console.log(file);
        this.files.splice(this.files.indexOf(file), 1);
        this.form.get('files').setValue('')
        console.log(this.form.value);


    }
}
