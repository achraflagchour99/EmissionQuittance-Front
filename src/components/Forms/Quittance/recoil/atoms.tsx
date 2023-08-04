import { List } from 'immutable';
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
  export const jsonDatalibelle = atom<List<string>>({
    key: 'jsonDatalibelle',
    default: List<string>(),// Use an empty array for the default value
  });