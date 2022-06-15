import mongoose, { Schema } from 'mongoose'

const DEVICE_TYPES = ['MIA1', 'SSS9', 'PX3', 'PX3A', 'SSS7']

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    os: {
        type: String,
        enum: ["Window", "macOS", "iOS", "Android"]
    },
    token: {
        type: String,
        default: ""
    },
    serial: {
        type: String,
        required: true
    },
    lastIpAddress: {
        type: String,
        required: true
    },
    lastOnlineAt: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true })

deviceSchema.methods = {
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

const model = mongoose.model('Device', deviceSchema)

export const schema = model.schema
export default model