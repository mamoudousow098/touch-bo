export interface Response<T> {
    data: T
    errors: []
    message: string
    statusCode: number
}


