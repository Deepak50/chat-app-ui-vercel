import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function TestSocket() {
    var stompClient = null;
    function connect() {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem('bearer'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        console.log("connected...............");
        var socket = new SockJS('https://chatapp-zoa1.onrender.com/stomp-endpoint');
        // socket.addEventListener('open', function (event) {
        //     var token = "your_auth_token";
        //     socket.send('Authorization: Bearer ' + sessionStorage.getItem('bearer'));
        // });
        // var socket = new SockJS('http://localhost:8080/stomp-endpoint', null, {
        //     withCredentials: false
        // });

        // var userName = select("#userName").value;
        var userName = "ramesh";
        console.log("----------------------------------------------", userName);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            // setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/sendToAll', function (greeting) {
                //			showGreeting(JSON.parse(greeting.body));
                console.log("Subscribed greeting to :", userName);
            });
            stompClient.subscribe(`/user/${userName}/msg`, function (message) {
                console.log("Subscribed username to :", userName);
                console.log("This msg is sent by: ", message['body']);
            });
        });
    }

    function sendToUser() {
        stompClient.send("/app/message", {}, JSON.stringify({
            'endpoint': 'endpoint'
        }));
    }

    return (
        <>
            <button onClick={connect}>Connect</button>
            <button>Disconnect</button>
            <button>Send</button>
            <button>Send to user</button>
        </>
    )
}

export default TestSocket;