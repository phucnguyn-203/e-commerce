import axiosClient from "./axios";
import { UserResponse } from "../common/model";
import { FormData } from "../pages/login";

export async function checkIsLogin(): Promise<UserResponse> {
    const url: string = "/users/check-token";
    return await axiosClient.get(url);
}

export async function loginUser(data: FormData): Promise<UserResponse> {
    const url: string = "/users/login";
    return await axiosClient.post(url, data);
}

export async function logout(): Promise<void> {
    const url: string = "/users/logout";
    return await axiosClient.get(url);
}