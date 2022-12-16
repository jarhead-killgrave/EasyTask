import React, {createContext} from "react";

// The TokenContext is a React context object that provides
// access to the token of the connected user.
export const TokenContext = createContext();

// The UsernameContext is a React context object that provides
// access to the userName of the connected user.
export const UsernameContext = createContext();

// The FeedbackContext is a React context object that provides
// access to the feedback of the connected user.
export const FeedbackContext = createContext();

