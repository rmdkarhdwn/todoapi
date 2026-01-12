import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.API_KAY,
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
})
