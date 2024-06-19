import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";
import axios, { AxiosRequestConfig } from 'axios';
axios.defaults.withCredentials = true;
const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchData(input: string, init: RequestInit = {}): Promise<any> {
    try {
        const config: AxiosRequestConfig = {
            url: base_url + input,
            method: init.method,
            headers: init.headers ? Object.fromEntries(new Headers(init.headers)) : undefined,
            data: init.body,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error;
            if (error.response.status === 401) {
                throw new UnauthorizedError(errorMessage);
            } else if (error.response.status === 409) {
                throw new ConflictError(errorMessage);
            } else {
                throw new Error("Request failed with status: " + error.response.status + " message: " + errorMessage);
            }
        }
        throw error;
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response;
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response;
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response;
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", { method: "GET" });
    return response;
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response;
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response;
}

export async function deleteNote(noteId: string) {
    await fetchData(`/api/notes/${noteId}`, { method: "DELETE" });
}
