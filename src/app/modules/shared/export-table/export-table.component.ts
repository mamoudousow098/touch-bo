import {Component, Input} from '@angular/core';
import {NotFoundError, Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {exportExcelFile} from 'src/app/commons/helpers';
import {AppError} from 'src/app/commons/errors/app-error';
import {Router} from '@angular/router';
import {ForbiddenError} from 'src/app/commons/errors/forbidden-error';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-export-table',
    templateUrl: './export-table.component.html',
    styleUrls: ['./export-table.component.css']
})
export class ExportTableComponent {
    @Input() data$: Observable<any[]>;
    @Input() headers: string[];
    @Input() fileName: string;


    constructor(
        private router: Router,
        private toastr: ToastrService,
        private translateService : TranslateService
    ) {
    }

    private updateTranslatedLabelErr() {
        this.translateService.get('CANNOT_EXPORT').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.warning(translation, this.translateService.instant('File download error'));
        });
    }
    private updateTranslatedLabelWarning() {
        this.translateService.get('THERE_IS_NO_DATA_AVAILABLE').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('No Data Available'));
        });
    }
    private updateTranslatedLabelInfo() {
        this.translateService.get('FILE_WILL_BE_EXPORTED_SOON_CHECK_DOWNLOADS').subscribe((translation: string) => {
            // Display the translated success message
            this.toastr.success(translation, this.translateService.instant('File exportation'));
        });
    }

    exportExcel() {
        console.log('Start');

        this.data$.subscribe({
            next: (response) => {
                console.log(this.fileName);

                if (!response || !Array.isArray(response) || response.length === 0) {
                    // Show a SweetAlert for no data available
                    this.toastr.warning('There is no data available.', 'No Data Available', {
                        timeOut: 3000,
                    });
                    ;
                } else {
                    console.log(this.fileName);


                    console.log(this.headers);

                    try {
                        this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                            timeOut: 3000,
                        });
                        exportExcelFile(response, this.headers, this.fileName)

                    } catch (err) {
                        this.toastr.error('CANNOT_EXPORT', 'File download error', {
                            timeOut: 3000,
                        });
                    }
                }
            },
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found']);
                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden']);
            }
        });
    }

}
