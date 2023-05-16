import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditJob from './components/EditJob/EditJob';

function App() {
  return (
    <div className="App">
	<header className="App-header">
		Jobs Manager
	</header>
	  <Router> 
		<Routes>
	    <Route path='/' element={<HomePage/>}></Route>
		<Route path='/:id' element={<EditJob/>}></Route>
		</Routes>
	  </Router>
    </div>
  );
}

export default App;
