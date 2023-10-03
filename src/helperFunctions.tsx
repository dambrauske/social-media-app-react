import React from "react";

export const isValidEmail = (email: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export const hasUppercaseLetter = (string: string): boolean => {
    return /[A-Z]/.test(string);
}

export const validateUsername = (username: string | undefined, setterFunction: React.Dispatch<React.SetStateAction<string | null>>) => {

    if (username?.length === 0) return setterFunction('Username cannot be blank')
    if (username && username?.length < 4) return setterFunction('Username should be at least 4 characters long')
    if (username && username?.length > 20) return setterFunction('Username should be maximum 20 characters long')
}

export const validateEmail = (email: string | undefined, setterFunction: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (email?.length === 0) return setterFunction('Email cannot be blank')
    if (email) {
        if (!isValidEmail(email)) {
            return setterFunction('Email is not valid')
        }
    }
}

export const validatePassword = (password: string | undefined, setterFunction: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (password?.length === 0) return setterFunction('Password cannot be blank')

    if (password) {
        if (!hasUppercaseLetter(password)) {
            return setterFunction('Password should have an uppercase letter')
        }
    }

    if (password && password?.length < 4) return setterFunction('Password should be at least 6 characters long')
    if (password && password?.length > 20) return setterFunction('Password should be maximum 20 characters long')
}

export const validatePassword2 = (password: string | undefined, password2: string | undefined, setterFunction: React.Dispatch<React.SetStateAction<string | null>>) => {

    if (password2?.length === 0) return setterFunction('Password cannot be blank')
    if (password2 && password2?.length < 4) return setterFunction('Password should be at least 6 characters long')
    if (password2 && password2?.length > 20) return setterFunction('Password should be maximum 20 characters long')
    if (password !== password2) return setterFunction('Passwords should match')
}
