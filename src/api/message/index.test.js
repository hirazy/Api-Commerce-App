import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Message } from '.'

const app = () => express(apiRoot, routes)

let message

beforeEach(async () => {
  message = await Message.create({})
})

test('POST /messages 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /messages 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /messages/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${message.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(message.id)
})

test('GET /messages/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /messages/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${message.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(message.id)
})

test('PUT /messages/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /messages/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${message.id}`)
  expect(status).toBe(204)
})

test('DELETE /messages/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
