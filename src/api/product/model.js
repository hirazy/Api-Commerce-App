import mongoose, { Schema, SchemaTypes } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Shop',
        minlength: 4,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    image: {
        ref: "Resource",
        type: Schema.Types.ObjectId,
        required: true
    },
    images: [{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    colors: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    priceColors: [{

    }],
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    sold: {
        required: false,
        type: Number,
        default: 0
    },
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
    },

    addSold(number) {
        this.sold += number
        this.save()
    }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model