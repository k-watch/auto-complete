export const API_URL = {
  GET_SEARCH_LIST: '/sick',
} as const;

export const NAVIGATE_URL = {
  MAIN: '/',
} as const;

export const SEARCH_MOVE_DIR = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
} as const;

export const EXPIRE_TIME = 1000 * 60 * 5;

export type ApiUrlType = typeof API_URL[keyof typeof API_URL];
export type SearchMoveDirType =
  typeof SEARCH_MOVE_DIR[keyof typeof SEARCH_MOVE_DIR];
