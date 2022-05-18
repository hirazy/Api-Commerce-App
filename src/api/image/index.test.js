import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Image } from '.'

const app = () => express(apiRoot, routes)

let image

beforeEach(async () => {
  image = await Image.create({})
})

test('POST /images 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /images 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /images/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${image.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(image.id)
})

test('GET /images/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /images/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${image.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(image.id)
})

test('PUT /images/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /images/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${image.id}`)
  expect(status).toBe(204)
})

test('DELETE /images/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
