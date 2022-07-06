import mongoose, { Schema } from 'mongoose'

const resourceSchema = new Schema({
    /**
     * Require key not null , save into google cloud storage
     */
    key: {
        type: String,
        required: true,
        default: ''
    },
    type: {
        type: String,
        enum: ['IMAGE', 'AUDIO', 'VIDEO'],
        default: 'IMAGE'
    }
}, { timestamps: true })

resourceSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view,
            key: this.key,
            type: this.type
        } : view
    }
}

const model = mongoose.model('Resource', resourceSchema)

export const schema = model.schema
export default model