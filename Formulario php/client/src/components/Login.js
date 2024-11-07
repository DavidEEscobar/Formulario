import React, { useState } from 'react';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authServices';
import './Login.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser(emailOrUsername, password);
    console.log(response);

    if (response.success) {
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className='login-container'> 
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Iniciar sesion</h2>
        <FormInput
          className='form-input'
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="Correo electrónico o nombre de usuario"
          required
        />
        <FormInput
          className='form-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default Login;
