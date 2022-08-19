import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Purchase } from '.'

const app = () => express(apiRoot, routes)

let purchase

beforeEach(async () => {
  purchase = await Purchase.create({})
})

test('POST /purchases 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /purchases 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /purchases/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${purchase.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(purchase.id)
})

test('GET /purchases/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /purchases/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${purchase.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(purchase.id)
})

test('PUT /purchases/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /purchases/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${purchase.id}`)
  expect(status).toBe(204)
})

test('DELETE /purchases/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
