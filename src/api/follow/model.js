import mongoose, { Schema } from 'mongoose'

const followSchema = new Schema({
    user_id: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    follower_id: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    followedDate: {
        type: Date,
        required: false
    },
    unfollowedDate: {
        required: false,
        type: Date
    }
}, { timestamps: true })

followSchema.methods = {
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

    follow() {

        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            followedDate: this.followedDate
        }

        this.followedDate = new Date()

        return view
    },

    unfollow() {

        this.unfollowedDate = new Date()

        const view = {
            // simple view
            user_id: this.user_id,
            follower_id: this.follower_id,
            updatedAt: this.updatedAt,
            followedDate: this.followedDate,
            unfollowedDate: this.unfollowedDate
        }

        return view
    }

}

const model = mongoose.model('Follow', followSchema)

export const schema = model.schema
export default model