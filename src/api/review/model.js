import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    respecter: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    parent: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Review'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    }],
    name: {
        type: String,
        required: true
    },
    attended: {
        type: String,
        required: true,
    },
    count_review: {
        type: Number,
        required: true,
    },
    userful_count: {
        type: Number,
        required: false,
        default: 0
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
}, { timestamps: true })

reviewSchema.methods = {
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
    add_useful(number) {
        this.userful_count += number
        this.save()
    },
    getChildren() {
        return this.children
    }
}

const model = mongoose.model('Review', reviewSchema)

export const schema = model.schema
export default model