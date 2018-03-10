import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDWTHTeMLI-x0iTAjtAKvVGZj0CS-sQW6U",
  authDomain: "scrum-life.firebaseapp.com",
  databaseURL: "https://scrum-life.firebaseio.com",
  projectId: "scrum-life",
  storageBucket: "scrum-life.appspot.com",
  messagingSenderId: "1021111345653"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database
