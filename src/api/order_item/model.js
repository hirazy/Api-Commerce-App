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

orderItemSchema.statics.getLastWeek = function(name, fn) {
    let oneDay = 24 * 60 * 60
    let oneWeekAgo = Date.now() - (7 * oneDay)

    let ret = this.collection.group({
        key: "datestamp",
        initial: { "createdAt": 0 },
        reduce: function(doc, prev) {
            if (doc.createdAt > prev.createdAt) {
                prev.createdAt = doc.createdAt;
                prev.score = doc.score;

                // Add other fields, if desired:
                prev.name = doc.name;
            }
            // Process only documents created within past seven day
        },
        condition: { "createdAt": { "$gt": oneWeekAgo } }
    })

    return ret.retval
}

const model = mongoose.model('OrderItem', orderItemSchema)

export const schema = model.schema
export default model