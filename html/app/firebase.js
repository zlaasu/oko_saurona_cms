// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyB1lxyXRJDgBG0q5dbcg6B2PtlaWzLb_QQ",
    authDomain: "okosaurona-a8273.firebaseapp.com",
    databaseURL: "https://okosaurona-a8273.firebaseio.com",
    projectId: "okosaurona-a8273",
    storageBucket: "okosaurona-a8273.appspot.com",
    messagingSenderId: "841228839139",
    appId: "1:841228839139:web:443c009a028e1181957dd6",
    measurementId: "G-25X71JSC51"
};
firebase.initializeApp(config);

var FIREBASE_TOKEN;

const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function () {
        //console.log("Notification permission granted.");
        // get the token in the form of promise
        return messaging.getToken()
    })
    .then(function (token) {
        FIREBASE_TOKEN = token;
        //console.log("token is : " + token);
    })
    .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
    });

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    swal(payload.notification.title || "", payload.notification.message || "", 'info');
    HelloVietnam.notificationHeaderRefresh();
});