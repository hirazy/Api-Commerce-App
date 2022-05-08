import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Category } from '.'

const app = () => express(apiRoot, routes)

let category

beforeEach(async () => {
  category = await Category.create({})
})

test('POST /categories 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /categories 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /categories/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${category.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(category.id)
})

test('GET /categories/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /categories/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${category.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(category.id)
})

test('PUT /categories/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /categories/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${category.id}`)
  expect(status).toBe(204)
})

test('DELETE /categories/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
