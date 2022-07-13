import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, getAllCategory } from './controller'
import { master, token } from '../../services/passport'
import Category, { schema } from './model'

const { name, description } = schema.tree

const router = new Router()

/**
 * @api {post} /categories Create category
 * @apiName CreateCategory
 * @apiGroup Category
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.post('/',
    master(),
    // token({ required: true, roles: ["admin"] }),
    body({ name, description }),
    create)

/**
 * @api {get} /categories Retrieve categories
 * @apiName RetrieveCategories
 * @apiGroup Category
 * @apiUse listParams
 * @apiSuccess {Object[]} categories List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    // token({ required: true, roles: ["admin"] }),
    query(),
    index)

/**
 * @api {get} /categories Retrieve categories
 * @apiName RetrieveCategories
 * @apiGroup Category
 * @apiUse listParams
 * @apiSuccess {Object[]} categories List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/detail',
    master(),
    query(),
    // token({ required: true, roles: ["admin"] }),
    getAllCategory)

/**
 * @api {get} /categories/:id Retrieve category
 * @apiName RetrieveCategory
 * @apiGroup Category
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.get('/:id',
    master(),
    show)

/**
 * @api {put} /categories/:id Update category
 * @apiName UpdateCategory
 * @apiGroup Category
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /categories/:id Delete category
 * @apiName DeleteCategory
 * @apiGroup Category
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Category not found.
 */
router.delete('/:id',
    destroy)

export default router