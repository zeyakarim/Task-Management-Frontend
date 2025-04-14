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
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-100'>
            <div 
                className='flex gap-4 bg-[#F2C4CF] rounded-[12px] items-center border-2 border-[#fff]' 
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
                    <h3 className='font-[500] text-3xl'>Sign Up</h3>
                    <h2 className='font-bold text-3xl mt-4 mb-2' style={{ fontStyle:'italic', fontFamily:'auto'}}>
                        It's <span className='text-[#50DACC]'>T</span>ime to <span className='text-[#50DACC]'>T</span>rack your record
                    </h2>
                    <TextField 
                        label='User Name'
                        name='username'
                        type='text'
                        autoComplete='off'
                        placeholder='Enter your usename'
                        required
                        margin='normal'
                        autoFocus
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
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        margin="normal"
                        autoComplete="off"
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
                    <div className='flex items-center mt-[12px]'>
                        <button 
                            type='submit' 
                            className='bg-[#50DACC] text-[#000] border-none p-[10px] rounded-[10px] w-[200px] cursor-pointer'
                            style={{ boxShadow: '0 4px 12px #f3f3f3, 0 1px 3px #f3f3f3' }}
                        >Submit</button>
                    </div>

                    <p className='text-start'>Already Have Account?<Link to="/signin">Sign In</Link></p>
                </form>

                {loading ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default SignUp;