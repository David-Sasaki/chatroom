import { Message } from "./types";

const BASE_URL = process.env.REACT_APP_BASE_SERVER_URL || "";

export const createMessage = async (message: Message) => {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(message),
        redirect: "follow",
    };
    await fetch(`${BASE_URL}/create`, requestOptions);
};

export const readMessages = async () => {
    const response = await fetch(`${BASE_URL}/read`, {
        method: "GET",
    });
    const data = response.json();
    return data;
};
