import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Register.css';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [message, setMessage] = useState(''); 

	const navigate = useNavigate();

	const register = async function(){
		try {
			if (password !== verifyPassword){
				setMessage('The passwords entered do not match')
			} else {
				const response = await axios.post('/api/v1/auth/register', {name, email, password})
				if (response.status === 201){
					setMessage(`Registration successful, Welcome, ${response.data.user.name}`)
					let token = response.data.token; 
					localStorage.setItem('token', token)
					navigate('/')
				}
			}
		} catch (error) {
			setMessage(error.response.data.msg);
		} finally {
			setTimeout(() => {
				setMessage('')
				setName('')
				setEmail('')
				setPassword('')
				setVerifyPassword('')
			}, 2000)
		}
	}
	return (

		<main>
			<section> 
			<h1>Register</h1>
			<form className='register-form'>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} required/>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
				<label htmlFor='verify-password'>Verify password</label>
				<input type='password' name='verify-password' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required></input>
				<button type='button' className='register' onClick={register}>Register</button>
			</form>
			</section>
			<section>
				{message && <p className='error'>{message}</p>}
			</section>
		</main>
		
	)
}

export default Register; 
