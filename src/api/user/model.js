import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone'

const roles = ['user', 'admin']

const userSchema = new Schema({
    email: {
        type: String,
        // match: /^\S+@\S+\.\S+$/,
        required: false,
        // unique: true,
        trim: true,
        lowercase: true,
        default: '',
    },
    facebook_username: {
        type: String,
        required: false,
        // unique: true,
        trim: true,
        default: ''
            // validate: []
    },
    password: {
        type: String,
        required: false,
        minlength: [8, 'minimum 8 characters'],
        validate: []
    },
    name: {
        type: String,
        index: true,
        trim: true,
    },
    nickname: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        index: true,
        trim: true,
        // unique: true,
        default: '',
        // validate: [isMobilePhone]
    },
    dob: {
        type: Date,
        required: false
    },
    address: [{
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: false
    }],
    gender: {
        required: false,
        type: String,
        enum: ['Nam', 'Nữ', 'Khác']
    },
    payment: {
        required: false

    },
    respect: {
        type: Number,
        default: 5,
        max: 5,
        min: 1
    },
    coupons: {},
    /**
     * @param role 
     * @field ['user, 'admin]
     */
    role: {
        type: String,
        enum: roles,
        default: 'user'
    },
    picture: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    device_token: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

userSchema.path('email').set(function(email) {
    if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
        const hash = crypto.createHash('md5').update(email).digest('hex')
        this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
    }

    if (!this.name) {
        this.name = email.replace(/^(.+)@.+$/, '$1')
    }

    return email
})

userSchema.path('phone').validate(function(phone) {
    if (this.phone == '') {
        return true
    }
    return isMobilePhone(phone, "vi-VN")
})

userSchema.path('email').validate(function(email, next) {

    if (this.email == '') {
        return true
    }

    // if (this.isNew || this.isModified('email')) {
    //     userSchema.findOne({ email: email }).exec(function(err, users) {
    //         return !err && users.length === 0;
    //     });
    // } else return true;

    return isEmail(email)
        // if (this.isModified('email')) {
        //     validate: [isEmail, 'invalid email']
        //     return next()
        // }
}, 'Email already exists')

/**
 * validateBeforeSave: false
 */

userSchema.pre('save', function(next) {

    if (!this.isModified('password')) return next()

    /* istanbul ignore next */
    const rounds = env === 'test' ? 1 : 9

    // CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET)

    bcrypt.hash(this.password, rounds).then((hash) => {
        this.password = hash
        next()
    }).catch(next)
})

userSchema.virtual('domain').get(function() {
    return this.email.slice()
})

userSchema.plugin(schema => console.log(userSchema.path('name').path))

userSchema.pre('deleteOne', function() {

})

userSchema.methods = {
    view(full) {
        const view = {}
        let fields = ['id', 'name', 'picture', 'email', 'phone']

        if (full) {
            fields = [...fields, 'email', 'createdAt']
        }

        fields.forEach((field) => {
            if (this[field] != '') {
                view[field] = this[field]
            }
        })

        return view
    },

    authenticate(password) {
        return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    },

    isAdmin() {
        return this.roles == 'admin'
    }
}

userSchema.statics = {
    roles
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model