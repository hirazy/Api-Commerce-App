import { sign } from '../../services/jwt'
import { notFound, success } from '../../services/response/'
import { Schema } from 'bodymen'
import Otp, { schema } from '../otp/model'
import User, { userSchema } from '../../api/user/model'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

export const login = ({ user }, res, next) =>
    sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)

export const loginByOtp = ({ bodymen: { body: { email, phone, otp } } }, res, next) => {

    //  let otpSchema = null
    let checkEmail = false
    let checkPhone = false

    // Validate Email
    if (email != null) {
        checkEmail = isEmail(email)
    } else {
        if (phone != null) {
            checkPhone = isMobilePhone(phone)
        }
    }

    if (!checkEmail && !checkPhone) {
        console.log("Email or phone is unvalid!")
        res.status(400).json({
            code: 400,
            status: "Input is valid!"
        })
        return;
    }

    let bodyOtp = checkEmail ? { email: email } : { phone: phone }

    Otp.findOne(bodyOtp).then((otpSchema) => {

        if (!otpSchema) {
            res.status(404).json({
                code: 404,
                status: `Not found OTP with ${isEmail ? 'Email': 'Phone'} or OTP is expire`
            })
            return;
        }

        console.log("Otp " + otp)

        let verifyOtp = otpSchema.verifyOtp(otp)

        if (!verifyOtp) {
            res.status(400).json({
                code: 400,
                status: "Otp is wrong!"
            })
            return;
        }


        User.findOne(bodyOtp).then((user) => {
            /**
             * @apiStatus 200 
             * User not be created => Sign up
             */
            if (!user) {
                // success(res, 200)
                res.status(200).json({
                    code: 200,
                    status: "Not Registered"
                })
            } else {

                /**
                 * @apiStatus 201
                 * User created and Sign to send Token to user
                 */
                sign(user.id)
                    .then((token) => ({ token, user: user.view(true) }))
                    .then(

                        //success(res, 201)
                        (entity) => {
                            if (entity) {
                                res.status(201).json(entity)
                            }
                            return null
                        }
                    )
                    .catch(next)
            }
        })
    })

}

export const loginByEmail = ({ bodymen: { body: { email } } }, res, next) => {

    const bodyEmail = { email: email }

    User.findOne(bodyEmail).then((user) => {
        /**
         * @apiStatus 200 
         * User not be created => Sign up
         */
        if (!user) {
            console.log('Not Registered')
                // success(res, 200)
            res.status(200).json({
                code: 200,
                status: "Not Registered"
            })
        } else {
            console.log('Registered')
                /**
                 * @apiStatus 201
                 * User created and Sign to send Token to user
                 */
            sign(user.id)
                .then((token) => ({ token, user: user.view(true) }))
                .then((entity) => {
                    if (entity) {
                        res.status(201).json(entity)
                    }
                    return null
                })
                .catch(next)
        }
    })
}

export const loginByFaceBook = ({ bodymen: { body: { facebook_username } } }, res, next) => {

    const bodyFaceBook = { facebook_username: facebook_username }

    User.findOne(bodyFaceBook).then((user) => {
        /**
         * @apiStatus 200 
         * User not be created => Sign up
         */
        if (!user) {
            success(res, 200)
        } else {

            /**
             * @apiStatus 201
             * User created and Sign to send Token to user
             */
            sign(user.id)
                .then((token) => ({ token, user: user.view(true) }))
                .then(success(res, 201))
                .catch(next)
        }
    })
}