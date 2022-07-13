import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
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
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

cartSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            product: this.product,
            user: this.user,
            description: this.description,
            quantity: this.quantity,
            price: this.price,
            // createdAt: this.createdAt,
            // updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    },
    add() {
        this.quantity += 1
    },
    reduce() {
        this.quantity -= 1
        if (this.quantity == 0) {
            this.remove()
        }
    }
}

const model = mongoose.model('Cart', cartSchema)

export const schema = model.schema
export default model