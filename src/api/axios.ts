import axios from 'axios'
import type { MessageResponse } from '../types/todo';

export const api = axios.create({
    baseURL: import.meta.env.API_KAY,
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
})

export const getTodo = async() => { //괄호안에 들어가는 것은 만약 api에 매개변수가 필요하면 저 자리에 필요한 매개변수를 적는 공간이다.
    try{
        const {data} = await api.get<Response[]>("/posts"); //꺽쇠안에는 있는것은 타입을 말하는데 API 응답으로 Response 배열 안에 있는 타입으로 들어올것이라고 알려주는것
        return data
    } catch {
        console.error('error');
    }
}

export const addTodo = async(body : Request) => {
    try{
        const {data} = await api.post<MessageResponse>('/posts',body);
        return data
    } catch{
        console.error('error')
    }
}

export const authorTodo = async(author : string) => {
    try {
        const {data} = await api.get<Response[]>('/posts/author',{params : {author : author}});
        return data
    } catch {
        console.error('error')
    }
}

export const putTodo = async(id : number , body : Request) => {
    try{
        const {data} = await api.put<MessageResponse>(`/posts/${id}`,body)
        return data
    } catch {
        console.error('error')
    }
}

export const DeleteTodo = async(id : number) => {
    try{
        const {data} = await api.delete<MessageResponse>(`/posts/${id}`)
        return data
    } catch {
        console.error('error')
    }
}
