import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Address } from '.'

const app = () => express(apiRoot, routes)

let address

beforeEach(async () => {
  address = await Address.create({})
})

test('POST /addresses 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /addresses 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /addresses/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${address.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(address.id)
})

test('GET /addresses/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /addresses/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${address.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(address.id)
})

test('PUT /addresses/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /addresses/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${address.id}`)
  expect(status).toBe(204)
})

test('DELETE /addresses/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
