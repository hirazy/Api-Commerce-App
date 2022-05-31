import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { OrderItem } from '.'

const app = () => express(apiRoot, routes)

let orderItem

beforeEach(async () => {
  orderItem = await OrderItem.create({})
})

test('POST /order_items 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /order_items 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /order_items/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${orderItem.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(orderItem.id)
})

test('GET /order_items/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /order_items/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${orderItem.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(orderItem.id)
})

test('PUT /order_items/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /order_items/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${orderItem.id}`)
  expect(status).toBe(204)
})

test('DELETE /order_items/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
