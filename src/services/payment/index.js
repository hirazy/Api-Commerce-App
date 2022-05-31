import { stripeKey } from '../../config'

const stripe = require('stripe')(stripeKey)

var charge = await stripe.charges.retrieve(
    'ch_3L5OQD2eZvKYlo2C1PNi5BOE', {
        apiKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
    }
);

switch (err.type) {
    case 'StripeCardError':
        // A declined card error
        err.message; // => e.g. "Your card's expiration year is invalid."
        break;
    case 'StripeRateLimitError':
        // Too many requests made to the API too quickly
        break;
    case 'StripeInvalidRequestError':
        // Invalid parameters were supplied to Stripe's API
        break;
    case 'StripeAPIError':
        // An error occurred internally with Stripe's API
        break;
    case 'StripeConnectionError':
        // Some kind of error occurred during the HTTPS communication
        break;
    case 'StripeAuthenticationError':
        // You probably used an incorrect API key
        break;
    default:
        // Handle any other types of unexpected errors
        break;
}

const createPayment = await stripe.createPayment(

)

// stripe.customers.create()

module.export.default = createPayment