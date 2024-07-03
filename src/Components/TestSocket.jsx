// import * as SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import { Buffer } from "buffer";
// import { connect } from '../Utils/Utils';
// import { BACKEND_END_PT } from '../Constants';

// function TestSocket() {

//     // function decodeJwt(token) {
//     //     var base64Payload = token.split(".")[1];
//     //     var payloadBuffer = Buffer.from(base64Payload, "base64");
//     //     return JSON.parse(payloadBuffer.toString());
//     // }

//     var stompClient = null;
//     // function connect() {

//     //     const myHeaders = new Headers();
//     //     var userInfo = decodeJwt(sessionStorage.getItem('bearer'));
//     //     // userInfo.given_name;

//     //     console.log("connected...............");
//     //     var socket = new SockJS(BACKEND_END_PT+'/stomp-endpoint');
//     //     var userName = "ramesh";
//     //     console.log("----------------------------------------------", userName);
//     //     stompClient = Stomp.over(socket);
//     //     stompClient.connect({}, function (frame) {
//     //         // setConnected(true);
//     //         console.log('Connected: ' + frame);
//     //         stompClient.subscribe('/topic/sendToAll', function (greeting) {
//     //             //			showGreeting(JSON.parse(greeting.body));
//     //             console.log("Subscribed greeting to :", userName);
//     //         });
//     //         stompClient.subscribe(`/user/${userName}/msg`, function (message) {
//     //             console.log("Subscribed username to :", userName);
//     //             console.log("This msg is sent by: ", message['body']);
//     //         });
//     //     });
//     // }

//     function sendToUser() {
//         stompClient.send("/app/message", {}, JSON.stringify({
//             'endpoint': 'endpoint'
//         }));
//     }

//     return (
//         <>
//             {/* <button onClick={connect}>Connect</button> */}
//             <button>Disconnect</button>
//             <button>Send</button>
//             <button>Send to user</button>
//         </>
//     )
// }

// export default TestSocket;