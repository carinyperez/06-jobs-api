import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './EditJob.css';

const EditJob = () => {
	const [error, setError] = useState('')
	const [dateApplied, setDateApplied] = useState('')
	const [company, setCompany] = useState('')
	const [position, setPosition] = useState('')
	const [status, setStatus] = useState('')
	const [notes, setNotes] = useState('')
	const [source, setSource] = useState('')

	const {id} = useParams();


	useEffect(() => {
		getJob(id)
	},[])

	const getJob = async(id) => {
		try {
			const response = await axios.get(`/api/v1/jobs/${id}`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			});
			const job = response.data.job;
			setDateApplied(job.dateApplied)
			setCompany(job.company)
			setPosition(job.position)
			setStatus(job.status)
			setNotes(job.notes)
			setSource(job.source)
		} catch (error) {
			setError(error.response.data.msg)
		} finally {
			setTimeout(() => {
				setError('')
			}, 2000)
		}
	}
	const editJob = async(id) => {
		try {
			const data = {dateApplied, company, position, status, notes, source}
			await axios.patch(`/api/v1/jobs/${id}`, data, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
		} catch (error) {
			setError(error.response.data.msg)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		editJob(id)
	}
	return (
		<div>
			<section>
			<h1>Update Job </h1>
			<form onSubmit={handleSubmit} className='edit-job-form'>
				<label htmlFor='date-applied'>Date Applied</label>
				<input name='date-applied' placeholder='date applied' value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} ></input>
				<label htmlFor='company'>Company</label>
				<input name='company' placeholder='company' value={company} onChange={(e) => setCompany(e.target.value)} ></input>
				<label htmlFor='position'>Position</label>
				<input name='position' placeholder='job title' value={position} onChange={(e) => setPosition(e.target.value)} ></input>
				<label htmlFor='status'>Status</label>
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value='pending'>Pending</option>
					<option value='in process'>In Process</option>
					<option value='declined'>Declined</option>
				</select>
				<label htmlFor='notes'>Notes</label>
				<textarea name='notes' className='notes'placeholder='notes' value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>
				<label htmlFor='source'>Source</label>
				<input name='source' placeholder='source' value={source} onChange={(e) => setSource(e.target.value)} ></input>
				<button type='submit'>Update Job</button>
			</form>
			</section>
			<section>
				{error && <p className='error'>{error}</p>}
			</section>
			
			<Link to='/'>Go back to job list</Link>
		</div>
	)
}

export default EditJob; 