import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Cart } from '.'

const app = () => express(apiRoot, routes)

let cart

beforeEach(async () => {
  cart = await Cart.create({})
})

test('POST /carts 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /carts 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /carts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cart.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
})

test('GET /carts/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /carts/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cart.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cart.id)
})

test('PUT /carts/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /carts/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cart.id}`)
  expect(status).toBe(204)
})

test('DELETE /carts/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
