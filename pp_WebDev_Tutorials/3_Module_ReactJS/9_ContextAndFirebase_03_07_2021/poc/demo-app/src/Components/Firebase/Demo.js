import React, { useState} from 'react';
import firebase from './firebase-sdk';

function Demo() {
    // console.log(firebase);
    // gets firebase auth service
    const auth = firebase.auth();

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        try {
            console.log(email, password);
            setLoading(true);

            let res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res.user);

            setUser(res.user);
            setLoading(false);

        } catch(e) {
            setError(e.message);

            setTimeout(() => {
                setError("");
            }, 3000);

            setLoading(false);
        }

        setEmail("");
        setPassword("");
    }

    const handleSignOut = async () => {
        try {
            setLoading(true);

            let res = await auth.signOut();
            console.log(res);

            setUser(null);
            setLoading(false);

        } catch (e) {
            setError(e.message);

            setTimeout(() => {
                setError("");
            }, 3000);

            setLoading(false);
        }
    }

    return (
        <>
            {   loading ? <h1>Please wait........loading....</h1> : user == null ?
                <div>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <button onClick={handleSignIn} >Sign In</button>
                    { error ? <h1>{error}</h1> : <></> }
                </div>
                :
                <div>
                    <h2>{user.uid} is signed in!!</h2>
                    <button onClick={handleSignOut} >Sign Out</button>
                </div>
            }  
        </> 
    )
}

export default Demo
