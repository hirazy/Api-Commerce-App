import { decrypt } from '../../services/encrypt';
import { connectMomoWallet, requestTokenConnect } from '../../services/momo';
import { notFound, success } from '../../services/response/';
import { IsJsonString } from '../../services/util';
import { momoSecretKey } from '../../config'
import Payment from './model';

export const create = ({ body }, res, next) =>
    Payment.create(body)
    .then((payment) => payment.view(true))
    .then(success(res, 201))
    .catch(next)

export const connectMomoPayment = async({ bodymen: { body }, user }, res, next) => {

    let bodyConnectMomo = {
        ...body,
        partnerClientId: user.id
    }

    let responseConnect = connectMomoWallet(bodyConnectMomo)

    responseConnect.on('response', (response) => {
        response.setEncoding('utf8');
        response.on('data', (bodyResponse) => {
            if (response.statusCode == 200) {
                console.log('on Data')
                if (IsJsonString(bodyResponse)) {
                    let bodyConnect = JSON.parse(bodyResponse)

                    Payment.create({
                            user: user.id,
                            payment_status: 'token',
                            orderId: bodyConnect.orderId,
                            requestId: bodyConnect.requestId
                        })
                        .then((payment) => {
                            res.status(200).json(bodyConnect)
                        })
                }
            }
        })
        response.on('error', (err) => {
            console.log('Error' + JSON.stringify(err))
            res.status(404).json()
        })
    })
}

export const createMomoPayment = async({ bodymen: { body }, user }, res, next) => {

    let bodyRequestToken = {
        ...body,
        partnerClientId: user.id
    }

    console.log(bodyRequestToken)

    let responseRequestToken = requestTokenConnect(bodyRequestToken)

    responseRequestToken.on('response', (response) => {
        response.setEncoding('utf8');
        console.log(response.statusCode)
        response.on('data', (bodyResponse) => {
            console.log('Body: ' + response.statusCode);
            console.log(bodyResponse);
            if (response.statusCode == 200) {

                if (IsJsonString(bodyResponse)) {
                    console.log(JSON.parse(bodyResponse))

                    const bodeRequestToken = JSON.parse(bodyResponse)

                    /**
                     * value
                     * userAlias	
                     * profileId
                     */
                    const responseToken = decrypt(bodeRequestToken.aesToken, momoSecretKey)

                    Payment.create({
                            user: user.id,
                            payment_status: 'token',
                            requestId: bodeRequestToken.requestId,
                            orderId: bodeRequestToken.orderId,
                            accessToken: responseToken.vallue
                        })
                        .then((payment) => {
                            if (payment != null) {
                                res.status(200).json(payment.view())
                            }
                        })
                }

                // Payment.create({})
                //     .then((payment) => {})
            }
        })

        response.on('error', (err) => {
            console.log('Error' + JSON.stringify(err))
        })
    })

}

export const getPaymentUser = ({ user }, res, next) => {
    Payment.find({ user: user.id, payment_status: 'payment' })
        .then((payments) => payments.map((payment) => payment.view()))
        .then((payments) => {
            res.status(200).json(payments[0])
        })
        .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Payment.find(query, select, cursor)
    .then((payments) => payments.map((payment) => payment.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Payment.findById(params.id)
    .then(notFound(res))
    .then((payment) => payment ? payment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Payment.findById(params.id)
    .then(notFound(res))
    .then((payment) => payment ? Object.assign(payment, body).save() : null)
    .then((payment) => payment ? payment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Payment.findById(params.id)
    .then(notFound(res))
    .then((payment) => payment ? payment.remove() : null)
    .then(success(res, 204))
    .catch(next)