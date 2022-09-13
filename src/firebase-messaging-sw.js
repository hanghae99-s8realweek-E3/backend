importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxCIYngrB5Gz0zHZfvJQdyoTCapNJsCVA",
  authDomain: "mimictest-87e2d.firebaseapp.com",
  projectId: "mimictest-87e2d",
  storageBucket: "mimictest-87e2d.appspot.com",
  messagingSenderId: "855875123856",
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {

    const title = "Hello World";
    const options = {
        body: payload.data.status
    };

    return self.registration.showNotification(title, options);
});


// messaging.onMessage(function(payload){
//   console.log('onMessage: ', payload);
//   var title = "고라니 서비스";
//   var options = {
//           body: payload.notification.body
//   };
  
//   var notification = new Notification(title, options);
// });
