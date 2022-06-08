import { success, notFound } from '../../services/response/'
import { sendSms } from '../../services/sms'
import { sendMail } from '../../services/sendgrid'
import Otp, { schema } from './model'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

export const createSms = ({ bodymen: { body: { phone } } }, res, next) => {
    if (!isMobilePhone(phone)) {
        res.status(400).json({
            code: 400,
            "status": "Please enter valid phone number."
        })
        return;
    }

    Otp.findOne({ phone })
        //.then(notFound(res))
        .then((otp) => otp ? otp : Otp.create({ phone }))
        .then((reset) => {
            if (!reset) return null
            const { phone, otp } = reset

            console.log('Phone ' + phone)

            // link = `${link.replace(/\/$/, '')}/${token}`
            // link = ''
            const content = `
            Hirazy: KHONG CHIA SE OTP VOI BAT KY AI, bao gom ca nhan vien Hirazy. OTP: ${otp}. Tim hieu them tai: ...
        `
            return sendSms({ body: content, from: '+19403988217', to: phone, otp: otp })
        })
        .then((response) => response ? res.status(200).json({ code: response.status, status: "Sent successfuly!" }).end() : null)
        .catch(next)
}


export const createEmail = ({ bodymen: { body: { email } } }, res, next) => {

    if (!isEmail(email)) {
        res.status(400).json({
            code: 400,
            "status": "Please enter valid email."
        })
        return;
    }

    Otp.findOne({ email })
        // .then(notFound(res))
        .then((otp) => otp ? otp : Otp.create({ email }))
        .then((emailOtp) => {
            if (!emailOtp) return null
            const { email, otp } = emailOtp
            // link = `${link.replace(/\/$/, '')}/${token}`
            // link = ''
            const content = `
        <tbody>
            <tr>
                <td valign="top" align="center" style="padding-top:15px;padding-bottom:15px">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0f0f0;padding:0;margin:0" align="left">
                        <tbody>
                        <tr>
                            <td align="left" valign="top" style="padding:0 10px 0 10px">
                                <font size="3" style="font-family:Helvetica,Arial,sans-serif;color:#000;line-height:1.5em">
                                    Chào bạn user,
                                    <br><br>
                                    <font style="font-weight:600;color:#f00">
                                        LƯU Ý KHÔNG CHIA SẺ MÃ VỚI BẤT KỲ AI, kể cả nhân viên của Hirazy!!! 
                                    </font>
                                    <br>Để hoàn thành yêu cầu của bạn với Dang ky tai khoan Hirazy, vui lòng nhập mã gồm 6 chữ số trên Trang xác minh Email:  
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" align="center" style="padding:5px 5px 5px 5px">
                                <font size="5" style="font-family:Helvetica,Arial,sans-serif;font-weight:600;color:#000;letter-spacing:3px;line-height:1.5em">
                                    <br>
                                        ${otp}
                                    <br><br>
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="padding:5px 5px 5px 5px">
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="padding:5px 5px 5px 5px">
                                <font size="3" style="font-family:Helvetica,Arial,sans-serif;color:#000;line-height:1.5em">
                                    <br>Trân trọng, 
                                    <br>Hirazy
                                </font>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
        `
            return sendMail({ toEmail: email, subject: 'Xác nhận email của bạn', content: content })
        })
        .then(([response]) => response ? res.status(response.statusCode).json({
            code: response.statusCode,
            status: response.statusMessage
        }).end() : null)
        .catch(next)
}



export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Otp.find(query, select, cursor)
    .then((otps) => otps.map((otp) => otp.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Otp.findById(params.id)
    .then(notFound(res))
    .then((otp) => otp ? otp.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Otp.findById(params.id)
    .then(notFound(res))
    .then((otp) => otp ? Object.assign(otp, body).save() : null)
    .then((otp) => otp ? otp.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Otp.findById(params.id)
    .then(notFound(res))
    .then((otp) => otp ? otp.remove() : null)
    .then(success(res, 204))
    .catch(next)