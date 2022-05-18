import mongoose, { Schema } from 'mongoose'

const shippingSchema = new Schema({
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    country: {
        type: String,
        required: true
    },
    timelines: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Timeline"
    }],
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

shippingSchema.methods = {
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

const model = mongoose.model('Shipping', shippingSchema)

export const schema = model.schema
export default model