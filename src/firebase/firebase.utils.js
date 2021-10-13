
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
  apiKey: "AIzaSyAn-sIA-U8Q1w-okLSHxpEObYFUr8GSnF8",
  authDomain: "crown-db-8a1dd.firebaseapp.com",
  projectId: "crown-db-8a1dd",
  storageBucket: "crown-db-8a1dd.appspot.com",
  messagingSenderId: "355768742838",
  appId: "1:355768742838:web:b2482917a0947c99748717",
  measurementId: "G-HC0DTSC6PG"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch (error) {
      console.log('error creating user', error.message);
    }

  }

  
  return userRef;
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;

