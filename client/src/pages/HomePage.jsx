import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import  {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './HomePage.css';

const HomePage = () => {
	let [data, setData] = useState('');
	let [error, setError] = useState('');
	let token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		getAllJobs()
	}, [])

	const signOut = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	const getAllJobs = async() => {
		try {
			const response = await axios.get('/api/v1/jobs', {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			setData(response.data.jobs);
		} catch (error) {
			setError(error.response.statusText)
		}
	}

	return (
		<>
		{!token && 
		<div>
		<Login/>
		<Register/>
		</div>
		}
		{
			token &&
			<div>
		
			 <section>
			 <h1>Jobs List</h1>
			 {data && 
			 <table>
				<tr>
					<th><span>Date applied</span></th>
					<th><span>Company</span></th>
					<th><span>Job Title</span></th>
					<th><span>Notes</span></th>
					<th><span>Source</span></th>
				</tr>
				{data.map((job)=> {
					return (
				<tr>
					<td ><span>{job.dateApplied}</span></td>
					<td ><span>{job.company}</span></td>
					<td><span>{job.position}</span></td>
					<td><span>{job.notes}</span></td>
					<td><span>{job.source}</span></td>
				</tr>
					)
				})} 
			</table>
			}
			 </section>
			 <section>
				{error && <p className='error'>{error}</p>}
			 </section>
			 <section>
			 <button type="button" className="logoff" onClick={signOut}>Sign out</button>
			 </section>
			</div>
		}
		</>
	)
}

export default HomePage; 