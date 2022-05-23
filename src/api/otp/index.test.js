import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Otp } from '.'

const app = () => express(apiRoot, routes)

let otp

beforeEach(async () => {
  otp = await Otp.create({})
})

test('POST /otps 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /otps 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /otps/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${otp.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(otp.id)
})

test('GET /otps/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /otps/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${otp.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(otp.id)
})

test('PUT /otps/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /otps/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${otp.id}`)
  expect(status).toBe(204)
})

test('DELETE /otps/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
