import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Shop } from '.'

const app = () => express(apiRoot, routes)

let shop

beforeEach(async () => {
  shop = await Shop.create({})
})

test('POST /shops 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /shops 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /shops/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${shop.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shop.id)
})

test('GET /shops/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /shops/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${shop.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shop.id)
})

test('PUT /shops/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /shops/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shop.id}`)
  expect(status).toBe(204)
})

test('DELETE /shops/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
