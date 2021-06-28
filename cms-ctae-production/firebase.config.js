const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyCU9wldLAZERj6dGaD_lVOP4OsKMGByss4",
  authDomain: "cms-ctae.firebaseapp.com",
  projectId: "cms-ctae",
  storageBucket: "cms-ctae.appspot.com",
  messagingSenderId: "420624924781",
  appId: "1:420624924781:web:1978705249bf8167777f64",
  measurementId: "G-X9QGHMYH2G"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

module.exports =  { auth };
