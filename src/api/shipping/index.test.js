import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Shipping } from '.'

const app = () => express(apiRoot, routes)

let shipping

beforeEach(async () => {
  shipping = await Shipping.create({})
})

test('POST /shippings 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /shippings 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /shippings/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${shipping.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shipping.id)
})

test('GET /shippings/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /shippings/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${shipping.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shipping.id)
})

test('PUT /shippings/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /shippings/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shipping.id}`)
  expect(status).toBe(204)
})

test('DELETE /shippings/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
