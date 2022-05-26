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

    if (email != null) {
        checkEmail = isEmail(email)
    }

    if (phone != null) {
        checkPhone = isMobilePhone(phone)
    }

    if (!checkEmail && !checkPhone) {
        res.status(400).json({
            error: "Input is valid!"
        })
        return;
    }


    // Validate Email
    // if (checkEmail) {
    //     otpSchema = new Schema({ email: schema.tree.email, otp: schema.tree.otp })
    // } else {
    //     otpSchema = new Schema({ phone: schema.tree.phone, otp: schema.tree.otp })
    // }

    let bodyOtp = checkEmail ? { email: email } : { phone: phone }

    Otp.findOne(bodyOtp).then((otpSchema) => {

        if (!otpSchema) {
            res.status(404).json({
                error: `Not found OTP with ${isEmail ? 'Email': 'Phone'}`
            })
            return;
        }

        let verifyOtp = otpSchema.verifyOtp(otp)

        if (!verifyOtp) {
            res.status(400).json({
                error: "Otp is wrong!"
            })
            return;
        }


        User.findOne(bodyOtp).then((user) => {
            /**
             * User not be created
             */
            if (!user) {
                success(res, 200)
            } else {

                /**
                 * User created and Sign to send Token to user
                 */
                sign(user.id)
                    .then((token) => ({ token, user: user.view(true) }))
                    .then(success(res, 201))
                    .catch(next)
            }
        })
    })

}