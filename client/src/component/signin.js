import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import styles from './register.module.css';

const Signin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const create = () => {
        navigate('/'); // Navigate to home page when clicking "CLICK HERE"
    }

    const signIn = async (e) => {
        e.preventDefault();
        try {
            console.log('Signing in with:', { name, password }); // Log the data being sent
            const response = await axios.post('http://localhost:4000/admin/signin', { name, password });
            console.log('Sign-in response:', response.data); // Log the response from the server

            // Assuming successful authentication logic
            toast.success("Sign-in successful!");
            navigate('/profile'); // Redirect to profile page after successful sign-in
        } catch (error) {
            console.error("Sign-in error:", error.response?.data || error.message); // Log any errors
            toast.error("Invalid credentials");
        }
    }

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: '#8fc4b7' }}>
            <Toaster />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp" className={styles.img} alt="Samplephoto" />
                            <div className="card-body p-4 p-md-5">
                                <h3 className={styles.dash_head}>Welcome..</h3>
                                <form className="px-md-2" onSubmit={signIn}>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example1q">Name</label>
                                        <input type="text" id="form3Example1q" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example1q">Password</label>
                                        <input type="password" id="form3Example1q" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div style={{ display: "grid" }}>
                                        <button type="submit" className="btn btn-success btn-lg mb-1">Sign In</button>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <Link to="/">Create new account</Link>
                                            <a onClick={create} style={{ color: "blue", cursor: "pointer" }}>CLICK HERE</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signin;
