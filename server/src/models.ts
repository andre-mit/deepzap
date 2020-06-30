export interface User {
    email: string;
    name: string;
    photo: string;
}

export interface Message {
    message: string;
    sentUser: string;
    receiverUser: string;
    date: Date;
}