import mongoose, { Schema } from 'mongoose'

const timelineSchema = new Schema({
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

timelineSchema.methods = {
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

const model = mongoose.model('Timeline', timelineSchema)

export const schema = model.schema
export default model