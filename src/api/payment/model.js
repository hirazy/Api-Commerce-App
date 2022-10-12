import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    payment_type: {
        type: String,
        required: false,
        enum: ['Momo'],
        default: 'Momo'
    },
    amount: {
        type: Number,
        required: false,
        default: 0
    },
    payment_status: {
        type: String,
        required: true,
        enum: ['token', 'payment'],
        default: 'payment'
    },
    provider: {
        type: String,
        required: false,
        default: ''
    },
    account_no: {
        type: String,
        required: false,
    },
    orderId: {
        type: String,
        required: true
    },
    requestId: {
        type: String,
        required: false,
    },
    accessToken: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true })

paymentSchema.pre('save', function(next) {
    console.log('Pre Save')
    if (this.payment_status === 'token') {
        console.log('Expires')
        this.createdAt = 120
    }
    next()
})

paymentSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            payment_status: this.payment_status,
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Payment', paymentSchema)

export const schema = model.schema
export default model