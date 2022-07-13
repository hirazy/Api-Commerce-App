import { success, notFound } from '../../services/response/'
import Cart, { schema } from './model'
import Product, { productSchema } from '../product/model'

export const create = async({ user, body }, res, next) => {

    let price = await Product.findById(body.product)
        .then((product) => product.getPrice())
        .catch(next)

    Cart.create({...body, user: user.id, price: price })
        .then((cart) => cart.view(true))
        .then(success(res, 201))
        .catch(next)
}


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Cart.find(query, select, cursor)
    .then((carts) => carts.map((cart) => cart.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Cart.findById(params.id)
    .then(notFound(res))
    .then((cart) => cart ? cart.view() : null)
    .then(success(res))
    .catch(next)

export const getByUser = async({ user }, res, next) => {

    let cartsRes = []

    let carts = await Cart.find({ user: user.id })
        // .then((carts) => {
        //     console.log(JSON.stringify(carts))
        //     res.status(200).json(carts)
        // })
        .catch(next)

    // let productViews = []

    for (let cart of carts) {
        let product = await Product.findById(cart.product)
            .then((product) => product.viewCart())
            .catch(next)

        cartsRes.push({
            id: cart.id,
            quantity: cart.quantity,
            user: cart.user,
            description: cart.description,
            product: cart.product,
            price: cart.price,
            productView: product
        })
    }

    // let productRandoms = await Product.aggregate([{ $match: { _id: { $ne: params.id } } }, { $sample: { size: 8 } }])
    //     .then((products) => {
    //         let productViews = []
    //         products.map((product) => {
    //             productViews.push({
    //                 id: product._id,
    //                 name: product.name,
    //                 price: product.price,
    //                 image: product.image,
    //                 rating: product.rating,
    //                 sold: product.sold,
    //                 reviews: product.reviews
    //             })
    //         })
    //         return productViews
    //     })
    //     .catch(next)

    res.status(200).json(cartsRes)
}

export const addItem = ({ params }, res, next) => {
    Cart.findById(params.id)
        .then(notFound(res))
        .then((cart) => cart ? cart.add() : null)
        .then((cart) => {
            res.status(200).json(cart)
        })
        .catch(next)
}

export const reduceItem = ({ params }, res, next) => {
    Cart.findById(params.id)
        .then(notFound(res))
        .then((cart) => cart ? card.reduce() : null)
        .then((cart) => {
            res.status(200).json(cart)
        })
        .catch(next)
}

export const update = ({ body, params }, res, next) =>
    Cart.findById(params.id)
    .then(notFound(res))
    .then((cart) => cart ? Object.assign(cart, body).save() : null)
    .then((cart) => cart ? cart.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params, user }, res, next) => {
    Cart.findById(params.id)
        .then(notFound(res))
        .then((cart) => cart ? cart.remove() : null)
        .then((cart) => {
            res.status(204).json({
                'code': 204,
                'status': 'Deleted successfully!'
            })
        })
        .catch(next)
}