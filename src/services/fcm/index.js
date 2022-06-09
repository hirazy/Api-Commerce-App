const admin = require('firebase-admin')
const Queue = require('bull');
const serviceAccount = require("../../../google-service-account.json");

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    privateKey: ''
}

/**
 * Create FCM Queue Bull from Global FCM
 */
const fcmQueue = new Queue(
    'fcm', {
        redis: {}
    }

)

fcmQueue.process((job, done) => {
    console.log(job.data.name)
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

/**
 * @param {*} deviceTokens : List Device Tokens of Users
 * @param {*} messages : List Messages 
 */
export const sendFCM = async(deviceTokens, messages) => {
    admin.messaging().sendMulticast(deviceTokens, messages)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}