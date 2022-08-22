import mongoose, { Schema } from 'mongoose'

const orderItemSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    message: {
        required: false,
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        required: false,
        type: String,
        enum: ['UNCONFIRM', 'WAITING_PICK_UP', 'DELIVERING', 'DELIVERED', 'CANCELLED', 'RETURN'],
        default: 'UNCONFIRM'
    },
    time: [],
    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },
    paidAt: {
        type: Date,
        required: false,
    }
}, { timestamps: true })

orderItemSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            order: this.order,
            product: this.product,
            quantity: this.quantity,
            message: this.message,
            price: this.price,
            status: this.status
        }

        return full ? {
            ...view,
            address: this.address

            // add properties for a full view
        } : view
    },
    viewTimeLine() {
        const view = {
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return view
    },
    getAllPrice() {
        return quantity * price
    },
    changeStatus(statusOrder) {
        if (this.status != 'CANCELLED' &&
            this.status != 'DELIVERED' &&
            this.status != 'RETURN') {
            this.status = statusOrder
        }
    }
}

const model = mongoose.model('OrderItem', orderItemSchema)

export const schema = model.schema
export default model