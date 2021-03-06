import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your email to continue with resetting password')
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)
    }

    return (
        <div className="login-body">
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4 card-title'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} id="login-button" className="btn btn-primary" type='Submit'>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link className="btn btn-secondary" to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="secondary-stuff">
                <div className="w-100 text-center mt-2">
                    <p>Need an acoount?</p>
                    <Link className="btn btn-secondary" to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
