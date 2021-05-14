import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC4cf5aFfssLCSEUeDNylEtMKeyCmYYg80",
    authDomain: "instagram-clone-ae8cf.firebaseapp.com",
    projectId: "instagram-clone-ae8cf",
    storageBucket: "instagram-clone-ae8cf.appspot.com",
    messagingSenderId: "368395627241",
    appId: "1:368395627241:web:9160086a79758b70cede78",
    measurementId: "G-TDSDFFTV6L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db ,auth, storage}

