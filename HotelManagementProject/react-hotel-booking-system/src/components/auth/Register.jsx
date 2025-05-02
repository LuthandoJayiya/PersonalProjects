import { useState } from 'react'
import ApiService from '../services/ApiService.js'
import { useLocation, useNavigate } from 'react-router-dom'
import './Auth.css'
import PropTypes from 'prop-types'

const Register =  ({setIsLoggedIn}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phoneNumber: '',
    role: ''
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = e => {
    const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
      if (name == 'email') {
        formData.userName = value
    }
  }

  const validateForm = () => {
    const { firstName, lastName, email, password, phoneNumber } = formData
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return false
    }
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) {
      setErrorMessage('Please fill all the fields.')
      setTimeout(() => setErrorMessage(''), 30000)
      return
    }
    try {
        // Call the register method from ApiService
      const response = await ApiService.registerUser(formData)

      // Check if the response is successful
      if (response.statusCode === 200) {
        // Clear the form fields after successful registration
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          userName: '',
          password: '',
          phoneNumber: '',
          role: ''
        })
          setSuccessMessage('User registered successfully')
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
          setIsLoggedIn(true)
 

        setTimeout(() => {
          setSuccessMessage('')
          navigate(from, { replace: true })
        }, 2000)
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message)
      setTimeout(() => setErrorMessage(''), 30000)
    }
  }

  return (
    <div className='auth-container'>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      {successMessage && <p className='success-message'>{successMessage}</p>}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            type='text'
            name='firstName'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
              </div>
               <div className='form-group'>
          <label>Last Name:</label>
          <input
            type='text'
            name='lastName'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Phone Number:</label>
          <input
            type='text'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
      <p className='register-link'>
        Already have an account? <a href='/login'>Login</a>
      </p>
    </div>
  )
}
Register.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
}
export default Register
