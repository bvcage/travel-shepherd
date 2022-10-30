import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'

import reportWebVitals from './reportWebVitals'

console.log('Initial state: ', store.getState())

const unsubscribe = store.subscribe(() => {
   console.log('State after dispatch: ', store.getState())
})

store.dispatch({ type: 'trips/tripAdded', payload: 'trip 1'})
store.dispatch({ type: 'trips/tripAdded', payload: 'trip 2'})

store.dispatch({ type: 'trips/tripRenamed', payload: {id: 0, name: 'trip 0'}})

unsubscribe()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()