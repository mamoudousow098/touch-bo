import {Component, Input} from '@angular/core';
import {MediaService} from "../../../services/media.service";
import {AppError} from "../../../commons/errors/app-error";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-shared-media-download',
    templateUrl: './media-download.component.html',
    styleUrls: ['./media-download.component.css']
})
export class MediaDownloadComponent {

    @Input()
    token: string

    constructor(private mediaService: MediaService, private toaster: ToastrService) {
    }

    getMedia() {
        this.mediaService.getAll(this.token)
            .subscribe({
                next: (response) => {
                    window.location.href = response.data as string
                },
                error: (err: AppError) => {
                    this.toaster.error('An error occurred', 'Download failed');
                }
            });
    }


}
