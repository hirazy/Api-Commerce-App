import { success, notFound } from '../../services/response/'
import Order, { schema } from './model'
import OrderItem, { oderItemSchema } from '../order_item/model'
import Purchase, { purchaseSchema } from '../purchase/model'
import Cart, { cartItemSchema } from '../cart/model'
import Payment, { paymentSchema } from '../payment/model'

export const create = async({ user, body }, res, next) => {

    if (body.address == null && body.address != '') {
        return res.status()
    }

    let order = await Order.create({
            user: user.id,
            totalCost: body.totalCost,
            address: body.address
        })
        .then((order) => order.view(true))
        .catch(next)

    console.log(order.id)

    for (let o of body.carts) {
        console.log('Alo 123  ' + o.id)
        let orderItem = await OrderItem.create({
                order: order.id,
                address: user.address,
                product: o.product,
                quantity: o.quantity,
                price: o.price,
                message: o.message
            })
            .catch(next)

        await Cart.findById(o.id)
            .then(notFound(res))
            .then((cart) => cart ? cart.remove() : null)
            .catch(next)
    }

    res.status(200).json(order)
}


export const createOrderPayment = ({ bodymen: { body } }, res, next) => {

}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Order.find(query, select, cursor)
    .then((orders) => orders.map((order) => order.view()))
    .then(success(res))
    .catch(next)

export const findByUserId = ({ params }, res, next) =>
    Order.find({ user: params.userId })
    .then(notFound(res))
    .then((orders) => orders.map((order) => order.view()))
    .catch(next)

export const show = ({ params }, res, next) =>
    Order.findById(params.id)
    .then(notFound(res))
    .then((order) => order ? order.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Order.findById(params.id)
    .then(notFound(res))
    .then((order) => order ? Object.assign(order, body).save() : null)
    .then((order) => order ? order.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = async({ params, user }, res, next) => {
    if (params.id == 'me') {
        Order.find({ user: user.id })
            .then(async(orders) => {
                for (let order of orders) {
                    await OrderItem.deleteMany({ order: order.id })
                }
            })
            .then((orders) => {
                res.status(204).json({
                    'status': 'Delete successfully!'
                })
            })
            .catch(next)
    } else {
        Order.findById(params.id)
            .then(notFound(res))
            .then((order) => order ? order.remove() : null)
            .then(success(res, 204))
            .catch(next)
    }
}