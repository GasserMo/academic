"use client"
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
export const globalState = createContext();

const Context = ({ children }) => {
    const [data, setData] = useState({
        userData: null,
    });

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            setData((prevState) => ({
                ...prevState,
                userData: JSON.parse(userData),
            }));
        }
    }, []);

    return (
        <globalState.Provider value={{ data, setData }}>
            {children}
        </globalState.Provider>
    );
};

export default Context;
