import { success, notFound } from '../../services/response/'
import OrderItem, { schema } from './model'
import Order, { orderSchema } from '../order/model'
import Product, { productSchema } from '../product/model'

export const create = ({ body }, res, next) => {
    OrderItem.create(body)
        .then((orderItem) => orderItem.view(true))
        .then(success(res, 201))
        .catch(next)
}

export const getOrderbyUser = async({ user }, res, next) => {
    let orders = await Order.find({ user: user.id })
        .then((orders) => orders.map((order) => order.view()))
        .catch(next)

    let orderRes = []
    for (let order of orders) {
        let orderItems = await OrderItem.find({ order: order.id })
            .then((orders) => orders.map((orderItem) => orderItem.view()))
            .catch(next)

        console.log('Product ' + orderItems.length)
        for (let orderItem of orderItems) {

            let product = await Product.findById(orderItem.product)
                .then((product) => {
                    orderRes.push({
                        ...orderItem,
                        name: product.name,
                        image: product.image
                    })
                })
                .catch(next)
        }
    }
    res.status(200).json(orderRes)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    OrderItem.find(query, select, cursor)
    .then((orderItems) => orderItems.map((orderItem) => orderItem.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    OrderItem.findById(params.id)
    .then(notFound(res))
    .then((orderItem) => orderItem ? orderItem.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    OrderItem.findById(params.id)
    .then(notFound(res))
    .then((orderItem) => orderItem ? Object.assign(orderItem, body).save() : null)
    .then((orderItem) => orderItem ? orderItem.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params, user }, res, next) => {
    if (params.id == 'me') {

    } else {
        OrderItem.findById(params.id)
            .then(notFound(res))
            .then((orderItem) => orderItem ? orderItem.remove() : null)
            .then(success(res, 204))
            .catch(next)
    }
}