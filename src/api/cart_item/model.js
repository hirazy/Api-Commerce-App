import mongoose, { Schema } from 'mongoose'

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true })

cartItemSchema.methods = {
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

const model = mongoose.model('CartItem', cartItemSchema)

export const schema = model.schema
export default model