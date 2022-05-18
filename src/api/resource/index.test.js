import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Resource } from '.'

const app = () => express(apiRoot, routes)

let resource

beforeEach(async () => {
  resource = await Resource.create({})
})

test('POST /resources 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /resources 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /resources/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${resource.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(resource.id)
})

test('GET /resources/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /resources/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${resource.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(resource.id)
})

test('PUT /resources/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /resources/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${resource.id}`)
  expect(status).toBe(204)
})

test('DELETE /resources/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
