import { success, notFound } from '../../services/response/'
import { connectMomoWallet, requestTokenConnect } from '../../services/momo'
import { decrypt } from '../../services/encrypt'
import Payment, { schema } from './model'

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
        console.log(response.statusCode)
        response.on('data', (body) => {
            if (response.statusCode == 200) {
                let bodyConnect = JSON.parse(body)
                res.status(200).json(bodyConnect)
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

    let responseRequestToken = requestTokenConnect(bodyRequestToken)

    // Payment.find()

    responseRequestToken.on('response', (response) => {
        response.setEncoding('utf8');
        console.log(response.statusCode)
        response.on('data', (body) => {
            console.log('Body: ');
            console.log(body);
            if (response.statusCode == 200) {
                console.log(JSON.parse(body))

                const bodeRequestToken = JSON.parse(body)

                /**
                 * value
                 * userAlias	
                 * profileId
                 */
                const responseToken = decrypt(body.aesToken)

                // Payment.create({})
                //     .then((payment) => {})
            }
        })

        response.on('error', (err) => {
            console.log('Error' + JSON.stringify(err))
        })
    })

}

export const getPaymentUser = ({ user, body }, res, next) => {
    Payment.find({ user: user.id })
        .then((payments) => payments.map((payment) => payment.view()))
        .then(success(res, 201))
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