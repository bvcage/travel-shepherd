import './App.css'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App () {
   const [count, setCount] = useState(0)

   useEffect(() => {
      fetch("/hello")
         .then((r) => r.json())
         .then((data) => setCount(data.count))
   }, []);

   return (
      <Router>
         <Routes>
            <Route path='/testing' element={<h1>Test Route</h1>} />
            <Route path='/' element={<h1>Learn React = Page Count: {count}</h1>} />
         </Routes>
      </Router>
   );
}

export default App;