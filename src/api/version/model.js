import mongoose, { Schema } from 'mongoose'

const versionSchema = new Schema({
    version: {
        type: String,
        required: true,
        default: "1.0"
    },
    versionCode: {
        type: String,
        required: true,
        default: "1"
    },
    changeLog: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

versionSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            version: this.version,
            versionCode: this.versionCode,
            changeLog: this.changeLog,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Version', versionSchema)

export const schema = model.schema
export default model