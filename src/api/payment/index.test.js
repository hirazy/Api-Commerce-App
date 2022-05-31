import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Payment } from '.'

const app = () => express(apiRoot, routes)

let payment

beforeEach(async () => {
  payment = await Payment.create({})
})

test('POST /payments 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /payments 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /payments/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${payment.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(payment.id)
})

test('GET /payments/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /payments/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${payment.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(payment.id)
})

test('PUT /payments/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /payments/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${payment.id}`)
  expect(status).toBe(204)
})

test('DELETE /payments/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
