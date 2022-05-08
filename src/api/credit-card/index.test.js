import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { CreditCard } from '.'

const app = () => express(apiRoot, routes)

let creditCard

beforeEach(async () => {
  creditCard = await CreditCard.create({})
})

test('POST /credit-cards 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /credit-cards 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /credit-cards/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${creditCard.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(creditCard.id)
})

test('GET /credit-cards/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /credit-cards/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${creditCard.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(creditCard.id)
})

test('PUT /credit-cards/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /credit-cards/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${creditCard.id}`)
  expect(status).toBe(204)
})

test('DELETE /credit-cards/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
