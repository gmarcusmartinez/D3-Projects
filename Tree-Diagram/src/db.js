const { data } = require("./graph");
const update = require("./update");

var firebaseConfig = {
  apiKey: "AIzaSyAl9x6AYIW-pYXg2hr7JoeAIMATjdf8HFw",
  authDomain: "d3-firebase-91d5e.firebaseapp.com",
  databaseURL: "https://d3-firebase-91d5e.firebaseio.com",
  projectId: "d3-firebase-91d5e",
  storageBucket: "d3-firebase-91d5e.appspot.com",
  messagingSenderId: "1020600482634",
  appId: "1:1020600482634:web:258bfa068a9f71dd729fb3"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

db.collection("employees").onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };
    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;
      case "removed":
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });
  update(data);
});

module.exports = db;
