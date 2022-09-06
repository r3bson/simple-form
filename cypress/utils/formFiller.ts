import { getRandomEmail, getRandomString } from './random'

export type Form = {
    name: string
    email: string
    subject: string
    message: string
}

export const fillForm = (): Form => {
    return {
        name: getRandomString(),
        email: getRandomEmail(),
        subject: getRandomString(),
        message: getRandomString(),
    }
}
