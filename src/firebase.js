// Firebase setup by Bob
import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDevqH4crNkIvE61myARqAN-iQeg_hJPx4",
    authDomain: "metchup-285cb.firebaseapp.com",
    databaseURL: "https://metchup-285cb.firebaseio.com",
    projectId: "metchup-285cb",
    storageBucket: "metchup-285cb.appspot.com",
    messagingSenderId: "18524068247",
    appId: "1:18524068247:web:84d7155250def9e619ccd2",
    measurementId: "G-QYXMWBNLFF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Test run
export var db = firebase.firestore();
export const Auth = firebase.auth();
// 登录状态永久保存 -- 理论上是这样的，但是现在刷新就没了
Auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

/*db.collection("users").add({
    first: "Go",
    last: "Cats",
    born: 1815
})
.then(function(docRef) { 
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});*/