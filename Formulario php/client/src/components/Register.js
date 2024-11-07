import React, { useState } from 'react';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authServices';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await registerUser(username, email, password);
    if (response.success) {
      navigate('/login');  // Redirige al login si el registro es exitoso
    } else {
      setError(response.message || 'Error en el registro');
    }
  };

  return (
    <div className='register-container'>
      <form className='register-form'onSubmit={handleRegister}>
        <h2>Registro</h2>
        <FormInput
          className="form-input"        
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormInput
          className="form-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          className="form-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        <p>¿Ya tienes una cuenta?</p>
        <button className="switch-to-login, button" onClick={() => navigate('/login')}>Inicia sesión</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      
    </div>
  );
};

export default Register;
