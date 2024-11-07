export const loginUser = async (emailOrUsername, password) => {
    try {
      const response = await fetch('http://localhost:8000/public/index.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Error desconocido';
      const stack = error.stack || 'No stack trace available';

      console.error('Error al iniciar sesión:', errorMessage);
      console.error('Stack trace:', stack);

      return { success: false, message: errorMessage };
    }
  };

  export const registerUser = async (username, email, password) => {
    try {
        const response = await fetch('http://localhost:8000/public/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        return { success: false, message: 'Error en la solicitud de registro' };
    }
};

  