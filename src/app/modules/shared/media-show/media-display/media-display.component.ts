import {Component, Input} from '@angular/core';
import {MediaService} from "../../../../services/media.service";
import {ToastrService} from "ngx-toastr";
import {AppError} from "../../../../commons/errors/app-error";

@Component({
  selector: 'app-media-display',
  templateUrl: './media-display.component.html',
  styleUrls: ['./media-display.component.css']
})
export class MediaDisplayComponent {

    @Input()
    token: string;
    mediaUrl: string;
    displayModal: any;

    constructor(private mediaService: MediaService, private toaster: ToastrService) {
    }

    ngOnInit() {
        //this.getMedia();
        this.mediaUrl = "https://www.shutterstock.com/image-vector/vector-illustration-flag-senegal-on-600nw-1557577202.jpg"
    }

    getMedia() {
        this.mediaService.getAll(this.token)
            .subscribe({
                next: (response: any) => {
                    this.mediaUrl = response.data as string;
                },
                error: (err: AppError) => {
                    this.toaster.error('An error occurred while fetching media', 'Error');
                }
            });
    }
    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
