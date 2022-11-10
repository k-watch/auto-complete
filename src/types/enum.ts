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

export type SearchMoveDir =
  typeof SEARCH_MOVE_DIR[keyof typeof SEARCH_MOVE_DIR];
