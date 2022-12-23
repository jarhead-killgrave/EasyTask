import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {FeedbackContext, TokenContext, UsernameContext} from "./context/Context";
import Navigation from "./navigation/Navigation";

export default function App(){
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [feedback, setFeedback] = useState(null);



  return (
        <UsernameContext.Provider value={[username, setUsername]}>
            <TokenContext.Provider value={[token, setToken]}>
                <FeedbackContext.Provider value={[feedback, setFeedback]}>
                    <Navigation/>
                    <StatusBar style="auto" />
                </FeedbackContext.Provider>
            </TokenContext.Provider>
        </UsernameContext.Provider>
    );
}
