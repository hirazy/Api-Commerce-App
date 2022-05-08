import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Review } from '.'

const app = () => express(apiRoot, routes)

let review

beforeEach(async () => {
  review = await Review.create({})
})

test('POST /reviews 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /reviews 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /reviews/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${review.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(review.id)
})

test('GET /reviews/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /reviews/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${review.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(review.id)
})

test('PUT /reviews/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /reviews/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${review.id}`)
  expect(status).toBe(204)
})

test('DELETE /reviews/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
