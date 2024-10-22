import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const counter = (state = 0, action) => {
  switch (action.type){
    case   "INCREMENT":
      return state + 1;
    case   "DECREMENT":
      return state - 1;
    case   "RESET":
      return state =0;
    default:
      return state;
  }
};

const middleware = [];


const myLoger =(store) => (next) =>  (action) => {
  console.log ('dispatches an function', action.type);
  next (action);
  console.log ('update state is', store.getState());
}

if (process.env.NODE_ENV === 'development'){
  middleware.push (logger, myLoger);
}
const store = createStore(counter, applyMiddleware(...middleware));

const increment = {
  type: "INCREMENT"
};
const decrement = {
  type: "DECREMENT"
};
const reset = {
  type: "RESET"
};

const count = document.createElement("div");
count.innerText = store.getState();
count.id = "count";
document.body.append(count);

const decBtn = document.createElement("button");
decBtn.innerText = "-";
decBtn.onclick = () => store.dispatch(decrement);
document.body.append(decBtn);

const incBtn = document.createElement("button");
incBtn.innerText = "+";
incBtn.onclick = () => store.dispatch(increment);
document.body.append(incBtn);

const resetBtn = document.createElement("button");
resetBtn.innerText = "reset";
resetBtn.onclick = () => store.dispatch(reset);
document.body.append(resetBtn);

const render = () => {
  document.getElementById("count").innerText = store.getState();
};

store.subscribe(render);
