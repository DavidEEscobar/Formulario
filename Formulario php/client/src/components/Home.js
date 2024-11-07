import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='Home-container'>
            <form className='Home-form'>
                <button onClick={() => navigate('/login')}>Iniciar sesion</button> 
                <button onClick={() => navigate('/register')}>Registrarse</button>
            </form>        
        </div>
    )
}

export default Home;