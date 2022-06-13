import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Device } from '.'

const app = () => express(apiRoot, routes)

let device

beforeEach(async () => {
  device = await Device.create({})
})

test('POST /devices 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /devices 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /devices/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${device.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(device.id)
})

test('GET /devices/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /devices/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${device.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(device.id)
})

test('PUT /devices/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /devices/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${device.id}`)
  expect(status).toBe(204)
})

test('DELETE /devices/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
