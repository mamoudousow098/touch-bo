import {HttpEventType} from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import {ToastrService} from 'ngx-toastr';
import { Permissions } from 'src/app/commons/enums/Permissions';
import {AppError} from 'src/app/commons/errors/app-error';
import {UnprocessableEntityError} from 'src/app/commons/errors/unprocessable-entity-error';
import {handleFormError} from 'src/app/commons/helpers';
import {AgentFromExcel} from 'src/app/commons/interfaces/agent-from-excel';
import {AgentService} from 'src/app/services/agent.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-import-excel',
    templateUrl: './import-excel.component.html',
    styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent {

    @ViewChild('inputFile')
    inputFile: ElementRef;
    displayModal: any = false;
    file: File;
    agents: AgentFromExcel[]
    uploadProgression = false
    uploadCompleted = false
    templateDownloaded = false
    form = new FormGroup({
        file: new FormControl('', Validators.required),
    })
    Permissions = Permissions

    constructor(private agentService: AgentService,
                private toastr: ToastrService,
                public keycloakService: KeycloakService,
                private translateService : TranslateService) {
    }

    chooseFile() {
        this.inputFile.nativeElement.click()
    }

    refreshUpload() {
        //@ts-ignore
        this.file = undefined
        this.uploadCompleted = false
        this.uploadProgression = false
        this.form.reset()
        this.inputFile.nativeElement.value = ""
        console.log(this.file);
    }
    private updateTranslatedLabel() {
        this.translateService.get('FILE_SUCCESSFULLY_UPDATE').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('SUCCESS'));
        });
    }
    importFile() {
        if (this.form.valid) {

            this.uploadProgression = true
            this.uploadCompleted = false
            this.agentService.uploadAgentsFromExcel(this.file).subscribe({
                next: event => {
                    console.log(event);


                    if (event.type === HttpEventType.Response) {
                        this.uploadCompleted = true
                        this.uploadProgression = false
                        this.templateDownloaded = false
                        this.toggleModal()
                        this.updateTranslatedLabel();
                    }

                },

                error: (err: AppError) => {
                    if (err instanceof UnprocessableEntityError)
                        handleFormError(err, this.form)
                    setTimeout(() => {
                        this.uploadProgression = false
                        this.templateDownloaded = false
                    }, 2000);
                }
            });
        }
    }

    // On file Select
    onChange(event: any) {
        this.file = event.target.files[0];
        this.form.get('file')?.setValue(this.file.name)
        console.log(this.file, event.type);
    }

    toggleModal() {
        this.displayModal = !this.displayModal
        this.refreshUpload()
    }

}


