import './JobList.css';
import {FaEdit, FaTrash} from 'react-icons/fa';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const JobList = ({data, getAllJobs}) => {
	const [error, setError] = useState('');
	const navigate = useNavigate('');

	const deleteJob = async(id) => {
		try {
			await axios.delete(`/api/v1/jobs/${id}`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			});
			getAllJobs()
		} catch (error) {
			setError(error.response.data.msg)
		} finally {
			setTimeout(() => {
				setError('')
			}, 2000)
		}
	}
	return (
		<div>
			<section>
			<h1>Jobs List</h1>
			 {data && 
			 <table>
				<thead>
				<tr>
					<th><span>Date applied</span></th>
					<th><span>Company</span></th>
					<th><span>Job Title</span></th>
					<th><span>Status</span></th>
					<th><span>Notes</span></th>
					<th><span>Source</span></th>
				</tr>
				</thead>
				{data.map((job)=> {
					return (
				<tbody>
				<tr key={data._id}>
					<td ><span>{job.dateApplied}</span></td>
					<td ><span>{job.company}</span></td>
					<td><span>{job.position}</span></td>
					<td><span>{job.status}</span></td>
					<td><span>{job.notes}</span></td>
					<td><span>{job.source}</span></td>
					<td><FaEdit color='green' onClick={() => navigate(`/${job._id}`)}/></td>
					<td><FaTrash color='red' onClick={() => deleteJob(job._id)}/></td>
				</tr>
				</tbody>)
				})} 
			</table>
			 }
			</section>
			<section>
				{error && <p className='error'>{error}</p>}
			</section>
			 
		</div>
	)
}

export default JobList;

