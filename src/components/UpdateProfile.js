import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory("/")

    function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="profile-content">
            <div className="update-body">
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4 card-title'>Update Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required
                                defaultValue={currentUser.email} />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password - 6 character min</Form.Label>
                                <Form.Control type="password" ref={passwordRef} 
                                placeholder="Leave blank to keep the same" />
                            </Form.Group>
                            <Form.Group id='password-confirm'>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} 
                                placeholder="Leave blank to keep the same" />
                            </Form.Group>
                            <Button disabled={loading} id="login-button" className="w-100 mt-3 btn btn-primary" type='Submit'>Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                </div>
            </div>
        </div>
    )
}
