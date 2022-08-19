import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    // orders: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'OrderItem'
    // }],
    address: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Address",
    },
    // reference: {
    //     type: String,
    //     required: true
    // },
    // transaction
    purchase: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Purchase'
    },
    totalCost: {
        type: Number,
        required: true
    }
}, { timestamps: true })

orderSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            address: this.address,
            totalCost: this.totalCost,
        }

        return full ? {
            ...view,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
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