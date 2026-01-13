
export interface Responses {
    id : number
    title: string,
    content: string,
    author: string,
    rating: number,
    createdAt : string
}

export interface Request {
    title: string,
    content: string,
    author: string,
    rating: number,
}
export interface MessageResponse {
    message: string
}