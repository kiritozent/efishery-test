import { atom } from 'recoil';

export const globalTableFilterAtom = atom({
  key: 'GLOBAL_TABLE_FILTER',
  default: {}
});

export const globalOpenedModalKeyAtom = atom({
  key: 'GLOBAL_OPENED_MODAL_KEY',
  default: null
});

export const globalRefreshHashAtom = atom({
  key: 'GLOBAL_REFRESH_HASH',
  default: 0
});
