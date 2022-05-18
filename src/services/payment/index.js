import { stripeKey } from '../../config'

const stripe = require('stripe')(stripeKey)

const createPayment = await stripe.createPayment(

)

// stripe.customers.create()

module.export.default = createPayment