/**
 * verbs constants represents the request ver used in the library
 * @type {{GET: string, POST: string, PUT: string, PATCH: string, DELETE: string, OPTIONS: string}}
 */
export const VERBS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
    OPTIONS: 'options'
};

/**
 * System roles used in library
 * @type {{ADMIN: string, GUEST: string, USER: string}}
 */
export const ROLE_TYPE = {
    ADMIN: 'admin',
    GUEST: 'guest',
    USER: 'user'
};

/**
 * permission types
 * @type {{GRANT: number, DENY: number}}
 */
export const PERMISSION_TYPE = {
    GRANT: 0,
    DENY: 1
};
