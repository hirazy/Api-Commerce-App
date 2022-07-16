import { success, notFound } from '../../services/response/'
import Category, { schema } from './model'
import Product, { productSchema } from '../product/model'
import Shop, { shoptSchema } from '../shop/model'

export const create = ({ body }, res, next) =>
    Category.create(body)
    .then((category) => category.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = async({ querymen: { query, select, cursor } }, res, next) => {
    let categories = await Category.find(query, select, cursor)
        .then((categories) => categories.map((category) => category.view()))
        .catch(next)

    let products = await Product.aggregate([{ $match: {} },
            { $sample: { size: 10 } }
        ])
        .then((products) => {
            let productViews = []
            products.map((product) => {
                productViews.push({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    rating: product.rating,
                    sold: product.sold,
                    reviews: product.reviews
                })
            })
            return productViews
        })
        .catch(next)

    res.status(200).json({
        categories: categories,
        products: products
    })
}


export const getAllCategory = async({ querymen: { query, select, cursor } }, res, next) => {
    let categories = await Category.find(query, select, cursor)
        .then((categories) => categories.map((category) => category.view()))
        .catch(next)

    let products = await Product.aggregate([{ $match: {} }, { $sample: { size: 8 } }])
        .then((products) => {
            let productViews = []
            products.map((product) => {
                productViews.push({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    rating: product.rating,
                    sold: product.sold,
                    reviews: product.reviews
                })
            })
            return productViews
        })
        .catch(next)

    res.status(200).json({
        categories: categories,
        products: products
    })
}

export const getDetailCategory = async({ params }, res, next) => {

    let categories = await Category.findById(params.id, function(err, categories) {
        if (err) {
            if (err) {
                res.status(404).json(err);
            }
        }
    })


    let shops = []
    for (let shop of categories.shops) {
        let shopView = await Shop.findById(shop)
            .then((shop) => shop.view())
            .catch(next)
        shops.push(shopView)
    }

    let products = []
    for (let product of categories.products) {
        let productView = await Product.findById(product)
            .then((product) => product.view())
            .catch(next)
        products.push(productView)
    }

    res.status(200).json({
        shops: shops,
        products: products
    })
}

export const show = ({ params }, res, next) =>
    Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? Object.assign(category, body).save() : null)
    .then((category) => category ? category.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Category.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.remove() : null)
    .then(success(res, 204))
    .catch(next)