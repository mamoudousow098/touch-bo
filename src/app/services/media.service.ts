import {Injectable} from '@angular/core';
import {BaseAPIService} from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class MediaService extends BaseAPIService {

    getAll(token: string) {
        return this.httpGetCall(`/media/${token}`)
    }
}
