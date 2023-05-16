import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import  {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import CreateJob from '../components/CreateJob/CreateJob';
import './HomePage.css';
import JobList from '../components/JobList/JobList';

const HomePage = () => {
	let [data, setData] = useState('');
	let [error, setError] = useState('');
	let token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		getAllJobs()
	}, [token])

	const signOut = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	const getAllJobs = async() => {
		try {
			const response = await axios.get('/api/v1/jobs', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			setData(response.data.jobs);
		} catch (error) {
			setError(error.response.statusText)
		} finally{
			setTimeout(() => {
				setError('')
			}, 2000)
		}
	}

	return (
		<>
		{!token && 
		<section>
			<Login/>
			<Register/>
		</section>
		}
		{
			token &&
			<div >
			 <section>
			{(data && data.length > 0) && 
			<JobList data={data} getAllJobs={getAllJobs}/>
			}
			{data.length === 0 && <h1>No jobs to display, add a job below</h1>}
			 </section>
			 <div className='jobs-edit'>
				<section >
					<CreateJob getAllJobs={getAllJobs}/>
				</section>
			 </div>
			 <section>
				{error && <p className='error'>{error}</p>}
			 </section>
			 <section>
			 <button type="button" className="signout" onClick={signOut}>Sign out</button>
			 </section>
			</div>
		}
		</>
	)
}

export default HomePage; 