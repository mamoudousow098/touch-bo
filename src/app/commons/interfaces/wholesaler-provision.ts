import {Media} from "./media";
import {SimpleWholesaler} from "./simple-wholesaler";

export interface WholesalerProvision {
    token: string
    amount: number
    fees: number
    status: string
    wholesaler: SimpleWholesaler
    medias: Media[]
    createdAt: Date
}
