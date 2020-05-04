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
export const db = firebase.firestore();
export const Auth = firebase.auth();
// How long does login status last
Auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

//returns the person's data by the id
export function getUserById(id){
    db.collection("Users").doc(id).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            console.log("No such document!");
        }
    }).catch(err => console.log("Error getting document: ", err));
}

//returns several person data enrolling in the queried classId
export function getUserByClass(classId){
    db.collection("Users").where("classes", "array-contains", classId).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            console.log("No such document!");
        }
    }).catch(err => console.log("Error getting document: ", err));
}

//adds class by classId to the person by the id
export function addClassToUser(classId, id){
    console.log(classId);
    console.log(id);
    db.collection("Users").doc(id).update({
        classes: firebase.firestore.FieldValue.arrayUnion(classId)
    }).catch(err => {
        if (err.code === "not-found")
            alert("Error: user data not found");
    });
}

//deletes class by classId to the person by the id
export function deleteClassFromUser(classId, id){
    db.collection("Users").doc(id).update({
        classes: firebase.firestore.FieldValue.arrayRemove(classId)
    }).catch(err => {
        if (err.code === "not-found")
            alert("Error: user data not found");
    });
}
