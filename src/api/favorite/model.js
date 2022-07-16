import mongoose, { Schema } from 'mongoose'

const favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    followTime: {
        required: false,
        type: Date,
        default: Date.now()
    },
    unFollowTime: {
        required: false,
        type: Date
    }
}, { timestamps: true })

favoriteSchema.pre('save', function(next) {

    if (!this.isModified('followTime')) return next()

    if (this.followTime == null) {
        this.followTime = Date.now()
    }

    next()
})

favoriteSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            user: this.user,
            product: this.product,
            followTime: this.followTime,
            unFollowTime: this.unFollowTime,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    },
    isFavorite() {
        return this.unFollowTime != null ?
            ((this.followTime.getTime() > this.unFollowTime.getTime()) ? true : false) : true
    },
    changeFavorite() {
        if (this.isFavorite()) {
            this.unFollowTime = Date.now()
        } else {
            this.followTime = Date.now()
        }
    }
}

favoriteSchema.index({ product: 1, user: 1 }, { unique: true })

const model = mongoose.model('Favorite', favoriteSchema)

export const schema = model.schema
export default model