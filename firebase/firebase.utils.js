import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDrOwPPi-ajzwHs0jxdiDK5dNycS-99-us",
  authDomain: "juned8236-82f29.firebaseapp.com",
  databaseURL: "https://juned8236-82f29.firebaseio.com",
  projectId: "juned8236-82f29",
  storageBucket: "juned8236-82f29.appspot.com",
  messagingSenderId: "1034162372082",
  appId: "1:1034162372082:web:399dc0e0c1c4ef880c7f6b",
  measurementId: "G-33FF56KR24"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
