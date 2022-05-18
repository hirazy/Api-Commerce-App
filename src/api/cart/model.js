import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }

}, { timestamps: true })

cartSchema.methods = {
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

const model = mongoose.model('Cart', cartSchema)

export const schema = model.schema
export default model