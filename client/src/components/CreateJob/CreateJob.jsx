import { useState } from 'react'; 
import axios from 'axios';
import './CreateJob.css';

const CreateJob = ({getAllJobs}) => {
	const [dateApplied, setDateApplied] = useState('')
	const [company, setCompany] = useState('')
	const [position, setPosition] = useState('')
	const [status, setStatus] = useState('')
	const [notes, setNotes] = useState('')
	const [source, setSource] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const data = {dateApplied,company, position, status, source, notes};
			await axios.post('/api/v1/jobs', data, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}); 
			getAllJobs()
		} catch (error) {
			setError(error.response.statusText)
		} finally {
			setTimeout(() => {
				setError('')
				setDateApplied('')
				setCompany('')
				setPosition('')
				setStatus('')
				setNotes('')
				setSource('')
			}, 2000)
		}
	}
	return (
		<div>
			<section>
			<h1>Create a job</h1>
			<form onSubmit={handleSubmit} className='create-job-form'>
				<label htmlFor='date-applied'>Date Applied</label>
				<input name='date-applied' placeholder='date applied' value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} required></input>
				<label htmlFor='company'>Company</label>
				<input name='company' placeholder='company' value={company} onChange={(e) => setCompany(e.target.value)} required></input>
				<label htmlFor='position'>Position</label>
				<input name='position' placeholder='job title' value={position} onChange={(e) => setPosition(e.target.value)} required></input>
				<label htmlFor='status'>Status</label>
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value='pending'>Pending</option>
					<option value='in process'>In Process</option>
					<option value='declined'>Declined</option>
				</select>
				<label htmlFor='notes'>Notes</label>
				<input name='notes' placeholder='notes' value={notes} onChange={(e) => setNotes(e.target.value)} ></input>
				<label htmlFor='source'>Source</label>
				<input name='source' placeholder='source' value={source} onChange={(e) => setSource(e.target.value)} required></input>
				<button type='submit'>Create Job</button>
			</form>
			</section>
			<section>
				{error && <p className='error'>{error}</p>}
			</section>
			
		</div>
	)
}

export default CreateJob; 

