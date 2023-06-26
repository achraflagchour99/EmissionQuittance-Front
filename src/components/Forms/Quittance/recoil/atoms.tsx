import { atom } from 'recoil';

export const idCodePoliceState = atom<string>({
  key: 'idCodePoliceState',
  default: ''
});

export const jsonDataState = atom<string>({
    key: 'jsonDataState',
    default: '',
  });
export const jsonDataQuittance = atom<string>({
    key: 'jsonDataQuittance',
    default: '',
  });