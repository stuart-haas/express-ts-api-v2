// Api defaults
export const API_BASE_PATH = 'api';
export const ORDER_DEFAULT = ['updatedAt,DESC'];

// Custom http response headers
export const HEADER_REQUEST_ID = 'X-REQUEST-ID';
export const HEADER_INSTANCE = 'X-INSTANCE';

// Key-value namespace for blacklisting json web tokens
export const TOKENS_BLACKLIST = 'tokens:blacklist';

// Auth strategies
export const AUTH_LOCAL = 'local';
export const AUTH_JWT = 'jwt';
export const AUTH_API_TOKEN = 'api:token';

// Http request methods
export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const PATCH = 'patch';
export const DELETE = 'delete';

// Decorator metadata keys
export const PATH = 'path';
export const ROUTES = 'routes';
export const MIDDLEWARE = 'middleware';
export const STATUS = 'status';
export const TRANSFORM = 'transform';
export const WRAPPER = 'data';
export const ROLE = 'role';
export const MESSAGE = 'message';
export const AUTH = 'auth';
export const VALIDATE = 'validate';
export const ORDER = 'order';
export const VALIDATORS = 'validators';
export const AUTH_SCOPE = 'auth:scope';
