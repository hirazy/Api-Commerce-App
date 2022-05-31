// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
import { twilioAccountSID as accountSid, twilioAuthToken as authToken } from '../../config'
const client = require('twilio')(accountSid, authToken);

export const sendSms = ({ body, from, to, otp }) => {
    console.log('Account ID ' + accountSid + ' Auth Token ' + authToken)
    const sms = {
            body: body,
            messagingServiceSid: 'MG10ff6f124fb4762fc28d2c91d50d8bf9',
            to: to
        }
        /**
         * Test Twilio Send Message SMS
         */
    return client.messages
        .create(sms)
        // .then(message => console.log(message.sid))
        // .done()
        // .then(message => console.log(message.sid))
        // .catch((err) => console.log(err));
}