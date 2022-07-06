import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    total_amount: {
        required: true,
        type: Number,
        validate: []
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: false,
        trim: true
    },
    // sale_kind: {
    //     type: Boolean
    // },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    phone: {
        type: String,
        required: true,
    },
    address: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
    reference: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
        required: true,
        default: false
    }

}, { timestamps: true })

orderSchema.methods = {
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

    // cancel(id, params) {

    // }
}

// orderSchema.prototype.cancel = function cancel(id, params) {
//     const url = this.buildUrl(`${id}/cancel`);
//     return this.shopify
//         .request(url, 'POST', undefined, params)
//         .then((body) => body[this.key]);
// };


const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model