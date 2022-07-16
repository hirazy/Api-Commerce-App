import mongoose, { Schema } from 'mongoose'

const followSchema = new Schema({
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    shop: {
        ref: "Shop",
        type: Schema.Types.ObjectId,
        required: true
    },
    followTime: {
        type: Date,
        required: false,
        default: Date.now()
    },
    unFollowTime: {
        required: false,
        type: Date
    }
}, { timestamps: true })

followSchema.pre('save', function(next) {

    if (!this.isModified('followTime')) return next()

    if (this.followTime == null) {
        this.followTime = Date.now()
    }

    next()
})

followSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            user: this.user,
            shop: this.shop,
            followTime: this.followTime,
            unFollowTime: this.unFollowTime,
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    },
    isFollow() {
        return this.unFollowTime != null ?
            ((this.followTime.getTime() > this.unFollowTime.getTime()) ? true : false) : true
    },
    changeFollow() {
        if (this.isFollow()) {
            this.unFollowTime = Date.now()
        } else {
            this.followTime = Date.now()
        }
    }
}

followSchema.index({ shop: 1, user: 1 }, { unique: true })

const model = mongoose.model('Follow', followSchema)

export const schema = model.schema
export default model