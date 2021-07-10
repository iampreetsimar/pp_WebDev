// We'll use npm instead of cdn for firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAu8C3Lhx1THE1A7Ubfm7DDcxUYwpkYkic",
    authDomain: "fir-react-demo-7e01e.firebaseapp.com",
    projectId: "fir-react-demo-7e01e",
    storageBucket: "fir-react-demo-7e01e.appspot.com",
    messagingSenderId: "811715831311",
    appId: "1:811715831311:web:d46d9d700428beee44a57a"
});

export default firebase;
    
