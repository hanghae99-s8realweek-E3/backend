importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

var createNotificationWithLink = function (image, title, content, link) {
  var notification = window.webkitNotifications.createNotification(
    image,
    title,
    content
  );

  notification.onclose = function () {
    alert(":(");
  };

  notification.onclick = function () {
    window.location.href = link;
  };

  return notification;
};


var noti = createNotificationWithLink(
  'http://funcook.com/img/favicon.png',
  'HTML5 Notification',
  'HTML5 Notification content...',
  'http://mycustom.dynamic.link.com/'
);

noti.show();


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
    body: payload.data.status,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(title, options);
});
