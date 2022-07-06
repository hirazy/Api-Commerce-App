import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { CartItem } from '.'

const app = () => express(apiRoot, routes)

let cartItem

beforeEach(async () => {
  cartItem = await CartItem.create({})
})

test('POST /cart_items 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /cart_items 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cart_items/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cartItem.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cartItem.id)
})

test('GET /cart_items/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /cart_items/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cartItem.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cartItem.id)
})

test('PUT /cart_items/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /cart_items/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cartItem.id}`)
  expect(status).toBe(204)
})

test('DELETE /cart_items/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
