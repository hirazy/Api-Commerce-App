import mongoose, { Schema, SchemaTypes } from 'mongoose'
var random = require('mongoose-simple-random');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Product',
        minlength: 4,
        unique: true,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    image: {
        // ref: "Resource",
        // type: Schema.Types.ObjectId,
        type: String,
        required: true
    },
    images: [{
        required: true,
        type: String
    }],
    // colors: [{
    //     type: String,
    //     required: true
    // }],
    // sizes: [{
    //     type: String,
    //     required: true
    // }],
    // favorite: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }],
    rating: {
        type: Number,
        required: true,
        default: 4.5
    },
    price: {
        type: Number,
        required: true
    },
    sold: {
        required: false,
        type: Number,
        default: 0
    },
    quantity: {
        required: false,
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: false,
    },
    /**
     * File HTML of Resources
     */
    description: {
        required: false,
        type: String,
        default: "",
        trim: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }],
    available: {
        type: Boolean,
        required: false,
        default: true
    },
    favorites: {
        type: Number,
        required: false,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0,
        required: false
    }
    // characteristics: [{
    //     type: String,
    //     default: ''
    // }],
    // reviews: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Review'
    // }],
    // tags: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Tag"
    // }]
}, { timestamps: true })

productSchema.virtual('avarageRating').get(function() {
    let rating = 0
    if (this.reviews.length == 0) {
        rating = 0
    }
    this.reviews.map((review) => {
        rating += review.rating
    })

    return rating / this.reviews.length
})

// productSchema.get()

productSchema.methods = {
    viewCart() {
        const view = {
            id: this.id,
            name: this.name,
            image: this.image
        }
        return view
    },
    view(full) {
        const view = {
            // simple view
            id: this.id,
            name: this.name,
            price: this.price,
            image: this.image,
            rating: this.rating,
            sold: this.sold,
            reviews: this.reviews
        }

        return full ? {
            ...view,
            images: this.images,
            shop: this.shop,
            category: this.category,
            description: this.description,
            tags: this.tags,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
                // add properties for a full view
        } : view
    },
    getPrice() {
        return this.price
    },
    addSold(number) {
        this.sold += number
        this.save()
    }
}

productSchema.plugin(random)

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model