import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate('');

	const login = async() => {
		try {
			const response = await axios.post('/api/v1/auth/login', {email, password})
			if (response.status === 200){
				setMessage(`Logon successful, welcome ${response.data.user.name}`)
				let token = response.data.token;
				localStorage.setItem('token', token)
				navigate('/')
			}
		} catch (error) {
			setMessage(error.response.data.msg)
		} finally {

			setTimeout(() => {
				setEmail('')
				setPassword('')
				setMessage('')
			}, 2000)
		}
	}


	return (
		<main >
		<section>
		<h1>Login</h1>
		<form className='login-form'>
			<label htmlFor='email'>Email</label>
			<input type='email' name='email' className='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
			<label htmlFor='password'>Password</label>
			<input type='password' name='password' className='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
			<button type='button' className='login' onClick={login} >Login</button>
		</form>
		</section>
		<section> 
		{message && <p className='error'>{message}</p>}
		</section>
		</main>
	)
}

export default Login; 