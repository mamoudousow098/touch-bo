export interface PaginatedResource<Resource> {
    content: Resource[]
    totalElements: number
    totalPages: number
    number: number
    first: boolean,
    last: boolean
}
