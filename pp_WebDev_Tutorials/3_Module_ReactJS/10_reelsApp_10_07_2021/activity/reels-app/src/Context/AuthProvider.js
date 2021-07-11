import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";
const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // exposing login/logout/signup functionalities to children components

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        login, 
        signup,
        logout
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanges(user => {
            // this updates the user state during mounting
            setCurrentUser(user);

            // this updates the loading state during mounting
            setLoading(false);
        })

        return () => {
            // to remove the attached observer
            // componentDidUnmount
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
