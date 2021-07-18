import React, { useState, useContext } from 'react';
import { AuthContext } from "../Context/AuthProvider";
import { storage, database } from "../firebase"; 

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { signup } = useContext(AuthContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            console.log(uid);

            // to upload file on clicking signup
            // uploads file to the path in firebase storage
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);

            // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
            // fn1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on("state_changed", fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }

            function fn2(err) {
                setError(err);
                setTimeout(() => {
                    setError("");
                }, 2000);

                setLoading(false);
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                
                // add details to users collection in firebase db
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })

                setLoading(false);
                console.log("User has signed up...");
            }
        } catch(err) {
            setError(err);
            setTimeout(() => {
                setError("");
            }, 2000);

            setLoading(false);
        }
    }

    // upload profile image of user
    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if(file != null) {
            setFile(file);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="">Username: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Email: </label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='profile'>Profile image: </label>
                    <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
                </div>
                <button type="submit" disabled={loading}>Signup</button>
            </form>
        </div>
    )
}

export default Signup
