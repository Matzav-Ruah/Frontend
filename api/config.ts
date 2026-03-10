export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,

  ENDPOINTS: {
    AUTH: {
      CSRF_TOKEN: '/users/get-csrf-token',
      LOGIN: '/users/login',
      LOGOUT: '/users/logout',
      REGISTER: '/users/register',
      CURRENT_USER: '/users/user',
    },

    USERS: {
      CURRENT: '/users/user',
    },
  },

  STORAGE_KEYS: {
    CSRF_TOKEN: '@csrf_token',
    USER: '@user_data',
  },

  CSRF: {
    HEADER_NAME: 'X-CSRFToken',
    COOKIE_NAME: 'csrftoken',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
