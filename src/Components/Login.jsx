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
        console.log("useEffect");
        var now = 0;
        var exp = 1;
        var bearer = sessionStorage.getItem('bearer');
        if (bearer != null && bearer !== 'undefined' && bearer !== 'null') {
            console.log("inside 1st if");
            const decodedToken = decodeJwt(bearer);
            now = new Date();
            exp = new Date(decodedToken.exp * 1000);
        }
        if (sessionStorage.getItem('bearer') != null && sessionStorage.getItem('bearer') !== 'undefined' && now < exp && sessionStorage.getItem('bearer') !== 'null') {
            console.log("inside 2nd if");
            navigate('/chat');
        }

        if (bearer == null || bearer === 'undefined' || bearer === 'null') {
            console.log("inside 3rd if");
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            console.log("code: ", code);
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
                .then((result) => {
                    
                    const jsonObject = JSON.parse(result);
                    console.log("coming here", result);
                    sessionStorage.setItem('bearer', jsonObject.id_token);
                    if (jsonObject.id_token != null && jsonObject.id_token !== 'undefined') {
                        console.log("coming here");
                        navigate('/chat');
                    }
                })
                .catch((error) => console.error(error));
        }
    }, []);

    const redirectToNewLink = () => {
        window.location.href = GOOGLE_AUTHCODE_END_POINT;
    };
    return (
        <>
            <button onClick={redirectToNewLink}>Login with Google</button>
        </>
    )
}

export default Login;