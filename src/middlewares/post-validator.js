import {body, param} from "express-validator"
import { validateFields } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';
import { deleteFileOnError } from "./delete-file-on-error.js";

export const createPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("category").isMongoId().withMessage("It is not a valid MongoID"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const updtPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("pid").isMongoId().withMessage("It is not a valid MongoID"),
    body("category").optional().isMongoId().withMessage("Not a valid category ID"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const deletePostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("pid").isMongoId().withMessage("It is not a valid MongoID"),
    validateFields,
    handleErrors
]