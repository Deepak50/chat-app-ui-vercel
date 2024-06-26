import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Buffer } from "buffer";
import { BACKEND_END_PT } from '../Constants';

export const getStompEndpoint = () => {
    var stompClient = null;

    var socket = new SockJS(BACKEND_END_PT + '/stomp-endpoint');
    stompClient = Stomp.over(socket);
    
    return stompClient;
}

export const decodeJwt = (token) => {
    var base64Payload = token.split(".")[1];
    var payloadBuffer = Buffer.from(base64Payload, "base64");
    return JSON.parse(payloadBuffer.toString());
}

export const printDate = (d) => {
    if (!d) return "";
    return d.getDate().toString() + "-" + d.getMonth().toString() + "-" + d.getFullYear().toString()
}
