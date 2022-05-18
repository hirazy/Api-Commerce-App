import mongoose, { Schema, SchemaTypes } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    prices: [{

    }],
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    quantity: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }],
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }]

}, { timestamps: true })

productSchema.virtual('avarageRating').
get(function() {
    let rating = 0
    if (this.reviews.length == 0) {
        rating = 0
    }
    this.reviews.map((review) => {
        rating += review.rating
    })

    return rating / this.reviews.length
})

productSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model