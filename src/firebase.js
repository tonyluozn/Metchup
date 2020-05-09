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
Auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

//returns the person's data by the id
export async function getUserById(userId){
    var retDoc;
    await db.collection("Users").doc(userId).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            retDoc = doc.data();
        } else {
            console.log("No such document!");
        }
    }).catch(err => handleErr(err));
    return retDoc;
}

//returns several person data enrolling in the queried classId
export async function getUserByClass(classId){
    var retDoc;
    await db.collection("Users").where("classes", "array-contains", classId).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            retDoc = doc.data();
        } else {
            console.log("No such document!");
        }
    }).catch(err => handleErr(err));
    return retDoc;
}

//adds class by classId to the person by the id
export function addClassToUser(classId, id){
    db.collection("Users").doc(id).get().then(function(doc) {
        var classes = doc.data().classes;
        var len = classes.length;
        if(classes.includes(classId)) {
            alert("Class already exists!");
        } else if(len >= 6) {
            alert("Achieved Maximum Class Capacity; Please check Dashboard");
        } else {
            db.collection("Users").doc(id).update({
                classes: firebase.firestore.FieldValue.arrayUnion(classId)
            }).then(alert("Class successfully added!"))
            .catch(err => handleErr(err));
        }
    }).catch(err => handleErr(err));
}

//deletes class by classId to the person by the id
export function deleteClassFromUser(classId, id){
    console.log("呃呃")
    db.collection("Users").doc(id).update({
        classes: firebase.firestore.FieldValue.arrayRemove(classId)
    }).then(alert("Class successfully removed!"))
    .catch(err => handleErr(err));
}

// handles errors with custom messages
export function handleErr(err) {
    if (err.code === "not-found") {
        alert("Error: data not found");
    } else {
        alert(err);
    }
    //More cases
}
