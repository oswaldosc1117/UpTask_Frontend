import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CheckPassword, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function RequestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN_UPTASK', data)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function recoveryPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/recovery-password'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function updatePassword({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function getUser() {
    try {
        const {data} = await api('/auth/user')
        const response = userSchema.safeParse(data)

        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function checkPassword(formData: CheckPassword) {
    try {
        const {data} = await api.post('/auth/check-password', formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}