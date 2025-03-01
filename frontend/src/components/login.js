const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Comment out or remove the demo code
      /*
      const userData = {
        username,
        token: 'simulated-auth-token-12345',
        email: `${username}@example.com`
      };
      
      onLogin(userData);
      */
      
      // Uncomment the real API connection code
      const response = await axios.post('http://127.0.0.1:8000/users/login/', {
        username,
        password
      });
      
      if (response.data && response.data.token) {
        onLogin({
          username: response.data.username,
          token: response.data.token,
          id: response.data.user_id
        });
      } else {
        throw new Error('Invalid response from server');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Invalid username or password');
      setLoading(false);
    }
  };