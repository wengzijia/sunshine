import {customAlphabet  } from 'nanoid'
const nanoid = customAlphabet('12345678', 8);
export function orderId(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let randomId = nanoid();
    let orderId = `${year}${month}${day}${hour}${minute}${randomId}`;
    return orderId
}

