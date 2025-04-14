import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from '../utility/axios-instance';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';
import Spinner from '../components/Spinner';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();	
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const data = {
            username: event?.target?.username?.value,
            password: event?.target?.password?.value,
        }

        axiosInstance
            .post(`/users/login`,{ data })
            .then((res) =>{
                setLoading(false);
                if (res?.data?.success) {
                    navigate('/')
                    dispatch(
                        setAuth({
                            authenticated: true,
                            user: res.data.data,
                        })
                    );
                } else {
                    alert(res?.data?.message)
                }
            });
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-100'>
            <div 
                className='flex gap-4 bg-[#F2C4CF] rounded-[12px] items-center border-2 border-[#fff] m-auto' 
                style={{boxShadow: '0 4px 12pxrgb(225, 225, 225), 0 1px 3px #f3f3f3'}}
            >
                <div className='w-[50%]'>
                    <img 
                        src="3d-1.png" alt=""
                        width='100%'
                        className='rounded-[12px]'
                    />
                </div>
                <form method="post" className='flex flex-col m-auto bg-[#F2C4CF] p-[40px] rounded-[12px]' style={{ width:'50%'}} onSubmit={handleSubmit}>
                    <h3 className='font-[500] text-[24px]'>Sign In</h3>
                    <h2 className='font-bold text-[24px] mt-4 mb-2' style={{ fontStyle:'italic', fontFamily:'auto'}}>
                        It's <span className='text-[#50DACC]'>T</span>ime to <span className='text-[#50DACC]'>T</span>rack your record
                    </h2>
                    <TextField 
                        label='Username'
                        name='username'
                        type='text'
                        placeholder='Enter your username'
                        required
                        margin='normal'
                        autoComplete='off'
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: 'black', // Default label color
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Focused state
                                },
                            },
                        }}
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
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: 'black', // Default label color
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black', // Default border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black', // Focused state
                                },
                            },
                        }}
                    />
                    <div className='flex items-start mt-[12px]'>
                        <button 
                            type='submit' 
                            className='bg-[#50DACC] text-[#000] border-none p-[10px] rounded-[10px] w-[200px] cursor-pointer'
                            style={{ boxShadow: '0 4px 12px #f3f3f3, 0 1px 3px #f3f3f3' }}
                        >Submit</button>
                    </div>
                    <p className='text-start'>Already Have Not Account?<Link to="/signup">Sign Up</Link></p>
                </form>

                {loading ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default SignIn;