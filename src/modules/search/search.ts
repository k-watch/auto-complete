import { SearchInterface } from 'types/api';
import { SearchMoveDir, SEARCH_MOVE_DIR } from 'types/enum';
import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

interface SearchState {
  searchWord: string;
  searchList: SearchInterface[];
  searchMoveIndex: number;
  searchMoveDir: SearchMoveDir;
}

const initialState: SearchState = {
  searchWord: '',
  searchList: [],
  searchMoveIndex: -1,
  searchMoveDir: SEARCH_MOVE_DIR.UP,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchWord(state, { payload: word }) {
      state.searchWord = word;
    },
    setSearchList(state, { payload: list }) {
      state.searchList = [...list];
    },
    setSearchMoveIndex(state, { payload: index }) {
      state.searchMoveIndex = index;
    },
    setSearchMoveDir(state, { payload: dir }) {
      state.searchMoveDir = dir;
    },
  },
});

export const {
  setSearchWord,
  setSearchList,
  setSearchMoveIndex,
  setSearchMoveDir,
} = searchSlice.actions;

// export const searchSelector = (state: WritableDraft<SearchState>) => state;

export const searchSelector = (state: any) => state.search as SearchState;

export default searchSlice.reducer;
