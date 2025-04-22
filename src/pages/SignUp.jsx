import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from '../utility/axios-instance';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        const data = {
            username: event?.target?.username?.value,
            email: event?.target?.email?.value,
            password: event?.target?.password?.value,
        }

        axiosInstance
            .post(`/users/signup`,{ data })
            .then((res) =>{
                setLoading(false);
                if (res?.data?.success) {
                    navigate('/signin');
                } else {
                    alert(res?.data?.message)
                }
            });
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#BFDADA]">
            <div 
                className='flex gap-4 rounded-xl bg-gradient-to-b from-[#8DB4B4] to-[#ADC9C9] justify-center items-center border-4 border-[#fff] h-[70vh] w-[70%] m-auto' 
                style={{ boxShadow: '0px 0px 6px 2px #0000001a' }}
            >
                <div className='w-[30%] h-[100%] rounded-xl relative'>
                    <div className='flex flex-col gap-4 p-6'>
                        <img 
                            src="logo.png" 
                            alt=""
                            className='rounded-lg w-8 h-8'
                        />
                        <div className='flex flex-col gap-1'>
                            <p className='text-white text-xl m-0'>Welcome to</p>
                            <h2 className='font-semibold text-3xl m-0 mb-2 text-white'>
                                Tasks Management
                            </h2>
                            <p className='text-white text-base m-0'>It's time to track your task record</p>
                        </div>
                    </div>
                    <img 
                        src="3d-image.png" alt=""
                        width='100%'
                        className='rounded-[12px] absolute bottom-6 -right-24'
                    />
                </div>

                <form 
                    method="post" 
                    className='flex flex-col h-[100%] gap-4 py-24 px-28 rounded-lg bg-white' 
                    style={{ width: '70%' }} 
                    onSubmit={handleSubmit}
                >
                    <h3 className='font-semibold text-2xl'>Create Account</h3>

                    <TextField 
                        label='User Name'
                        name='username'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter your usename'
                        required
                        margin='normal'
                        autoFocus
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        margin="normal"
                        autoComplete="off"
                    />

                    <TextField
                        margin="normal"
                        required
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        id="password"
                        autoComplete='off'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div className='flex items-center mt-[12px]'>
                        <button 
                            type='submit' 
                            className='bg-[#8BB2B2] text-[#fff] border-none p-2 rounded-lg w-full cursor-pointer font-semibold'
                            style={{ boxShadow: '0 4px 12px #f3f3f3, 0 1px 3px #f3f3f3' }}
                        >
                            Create Account
                        </button>
                    </div>

                    <p className='text-start text-gray-400'>
                        Already Have Account? <Link to="/signin" className='text-[#719090] font-medium'>Sign In</Link>
                    </p>
                </form>

                {loading ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default SignUp;