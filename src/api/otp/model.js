import mongoose, { Schema } from 'mongoose'
import { uid } from 'rand-token'

const otpSchema = new Schema({
    email: {
        type: String,
        required: false,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    otp: {
        type: String,
        required: false,
        length: 6,
        trim: true,
        default: () => uid(6, 'numeric')
    },
    /**
     * Expire 15 minutes for user
     */
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900
    }
})

otpSchema.methods = {
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
    verifyOtp(otp) {
        return this.otp == otp
    }
}

const model = mongoose.model('Otp', otpSchema)

export const schema = model.schema
export default model