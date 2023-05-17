import { createStore } from 'redux';

// Define the shape of your store state
interface StoreState {
  myString: string;
}

// Define the shape of your Redux action
interface MyAction {
  type: string;
  payload: string;
}

// Define the initial state of your store
const initialState: StoreState = {
  myString: ''
};

// Define your Redux reducer function
function reducer(state: StoreState = initialState, action: MyAction) {
  switch (action.type) {
    case 'SET_STRING':
      return { ...state, myString: action.payload };
    default:
      return state;
  }
}

// Create your Redux store and export it
const store = createStore(reducer);

export default store;
