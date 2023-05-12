import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
	<header className="App-header"></header>
	  <Router> 
		<Routes>
	    <Route path='/' element={<HomePage/>}></Route>
		</Routes>
	  </Router>
    </div>
  );
}

export default App;
