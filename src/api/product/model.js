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
    // colors: [{
    //     type: String,
    //     required: true
    // }],
    // sizes: [{
    //     type: String,
    //     required: true
    // }],
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
    /**
     * File HTML of Resources
     */
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
    // characteristics: [{
    //     type: String,
    //     default: ''
    // }],
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
            name: this.name,
            price: this.price,
            image: this.image,
            rating: this.rating,
            sold: this.sold,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view,
            shop: this.shop,
            category: this.category,
            description: this.description,
            tags: this.tags,
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