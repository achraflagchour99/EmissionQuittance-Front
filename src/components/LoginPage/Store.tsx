import { createStore } from 'redux';

// La valeur initiale du state
const initialState = {
  value: '',
};

// Définition du reducer
function myReducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    // On définit une action "SET_VALUE" pour changer la valeur stockée
    case 'SET_VALUE':
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

// Création du store
const store = createStore(myReducer);

export default store;
