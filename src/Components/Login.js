import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Buffer } from "buffer";
import { CLIENT_ID, CLIENT_SECRET, GOOGLE_AUTHCODE_END_POINT, GOOGLE_TOKEN_END_PT, GRANT_TYPE_AUTH_CODE, GRANT_TYPE_REFRESH_TOKEN, REDIRECT_URI } from "../Constants";
function Login({ authCode, setAuthCode }) {

    const navigate = useNavigate();

    function decodeJwt(token) {
        var base64Payload = token.split(".")[1];
        var payloadBuffer = Buffer.from(base64Payload, "base64");
        return JSON.parse(payloadBuffer.toString());
    }

    useEffect(() => {
        var now = 0;
        var exp = 1;
        var bearer = sessionStorage.getItem('bearer');
        console.log("token outside: ", bearer);
        if (bearer != null && bearer !== 'undefined' && bearer !=='null') {
            console.log("the token is: ", bearer);
            const decodedToken = decodeJwt(bearer);
            now = new Date();
            exp = new Date(decodedToken.exp * 1000);
            console.log("now ", now, "exp", exp);
        }
        console.log("bearer token: ", sessionStorage.getItem('bearer'));
        if (sessionStorage.getItem('bearer') != null && sessionStorage.getItem('bearer') !== 'undefined' && now < exp && sessionStorage.getItem('bearer')!=='null') {
            console.log("the code inside is ", sessionStorage.getItem('bearer'));
            navigate('/chat');
        }
        else{
            console.log("the val is ", sessionStorage.getItem('bearer'));
        }

        if (bearer == null || bearer === 'undefined' || bearer === 'null') {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            const urlencoded = new URLSearchParams();
            urlencoded.append("client_id", CLIENT_ID);

            urlencoded.append("client_secret", CLIENT_SECRET);
            urlencoded.append("code", code);
            urlencoded.append("grant_type", GRANT_TYPE_AUTH_CODE);
            urlencoded.append("redirect_uri", REDIRECT_URI);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            };

            fetch(GOOGLE_TOKEN_END_PT, requestOptions)
                .then((response) => response.text())
                .then((result) => { const jsonObject = JSON.parse(result); sessionStorage.setItem('bearer', jsonObject.id_token); if (jsonObject.id_token != null && jsonObject.id_token !== 'undefined') { navigate('/chat'); } })
                .catch((error) => console.error(error));
        }
    }, []);

    const redirectToNewLink = () => {
        window.location.href = GOOGLE_AUTHCODE_END_POINT;
    };
    return (
        <>
            <button onClick={redirectToNewLink}>Login with Google</button>
            <button onClick={() => { console.log("hello: ", authCode) }}>print</button>
        </>
    )
}

export default Login;