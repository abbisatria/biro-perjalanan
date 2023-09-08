export interface payloadLogin {
    email: string;
    password: string;
}

export interface payloadRegister {
    email: string;
    password: string;
    name: string;
}

export interface responseLoginType {
    message: string;
    data: {
        Id: string;
        Name: string;
        Email: string;
        Token: string;
    }
}