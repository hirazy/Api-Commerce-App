import { success, notFound } from '../../services/response/'
import Category, { categorySchema } from '../category/model'
import Product, { productSchema } from './model'
import Shop, { shopSchema } from '../shop/model'
import Review, { reviewSchema } from '../review/model'
import Favorite, { favoriteSchema } from '../favorite/model'
import mongoose, { Mongoose, Schema, SchemaTypes } from 'mongoose'
import JSZip from 'jszip'

const zip = JSZip()

export const create = ({ body }, res, next) =>
    Product.create(body)
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Product.find(query, select, cursor)
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)

export const getHomeProduct = ({ params }, res, next) => {
    Product.find()
        .then(notFound(res))
        .then((products) => products.map())

}

export const getProductDetail = async({ params }, res, next) => {
    console.log("Get Product Detail")

    let product = await Product.findById(params.id, function(err, product) {
        if (err) {
            if (err) {
                // error finding brother
                res.status(404).json(err);
            }
        }
    })

    // product._id = null
    // .then(notFound(res))
    // // .then(success(res))
    // .catch(next)

    let reviews = await Review.find({ product: params.id })
        .catch(next)

    let shopView = await Shop.findById(product.shop)
        .then(notFound(res))
        .then((shop) => shop ? shop.view() : null)
        .catch(next)

    let productRandoms = await Product.aggregate([{ $match: { _id: { $ne: mongoose.Types.ObjectId(params.id) } } }, { $sample: { size: 8 } }])
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

    // let favorite = await Favorite.find({ user: params.user, product: params.id })
    //     .then((favorite) => {
    //         console.log(JSON.stringify(favorite))
    //         if (favorite.length > 0) {
    //             return favorite.isFavorite();
    //         }
    //         return false
    //     })

    res.status(200).json({
        product: product,
        reviews: reviews,
        // favorite: favorite,
        shop: shopView,
        productViews: productRandoms
    })
}


export const getRandomProduct = ({ params }, res, next) => {
    console.log("Get Random Product")
    Product.aggregate([{ $match: {} }, { $sample: { size: 8 } }])
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
            res.status(200).json(productViews)
        })
        .catch(next)
}



export const searchByName = ({ params }, res, next) =>
    Product.populate(
        'name', params.name
    )
    .then(notFound(res))
    .then((products) => products.map((product) => product.view()))
    .catch(next)

export const searchByKeyWord = ({ params }, res, next) => {
    // Product.populate(
    //         'name', params.name
    //     )
    //     .then(notFound(res))
    //     .then((products) => products.map((product) => product.view()))
    //     .catch(next)
    // var options = RegexOptions.CultureInvariant | RegexOptions.IgnoreCase;
    // var regex = new Regex(pattern, options);
    // var filter = Builders < Translation > .Filter.Regex(t => t.Vietnamese, new BsonRegularExpression(regex));

    Product.find({ 'name': { $regex: params.name } })
        .then((products) => products.map((product) => product.view()))
        .then((products) => {
            res.status(200).json(products)
        })
        .catch(next)
}


export const searchByCategory = ({ params }, res, next) =>
    Product.populate(
        'category'
    )

export const getAuthenticationProducts = () => {
    // zip.x
    const zipData = zip.file('data_home')

    Product.populate("")
        .find()
}

export const getByCategory = ({}, res, next) => {
    // Product
    //     .populate("category")
    Product.populate("catrgory")
        .find()
}

export const update = ({ body, params }, res, next) =>
    Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? Object.assign(product, body).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)