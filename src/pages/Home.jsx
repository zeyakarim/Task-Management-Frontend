import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import axiosInstance from '../utility/axios-instance';
import DialogComponent from './Dialog';
import { ArrowRight, BorderColor, Delete, Edit, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

const result = ['All', 'To Do', 'On Progress', 'QA', 'Completed'];

const groupTasksByStatus = (tasks) => {
    const result = [
        { status: 'To Do', items: [] },
        { status: 'On Progress', items: [] },
        { status: 'QA', items: [] },
        { status: 'Completed', items: [] }
    ];

    const statusMap = {
        'to-do': 'To Do',
        'in-progress': 'On Progress',
        'qa': 'QA',
        'completed': 'Completed'
    };
  
    tasks.forEach(task => {
        const mappedStatus = statusMap[task.status.toLowerCase()] || task.status;
        const statusGroup = result.find(group => group.status === mappedStatus);
    
        if (statusGroup) {
            statusGroup.items.push({
                id: task?.id,
                title: task.title,
                git_branch_name: task.git_branch_name,
                card_no: task.card_no,
                icon: '/user.jpeg',
                card_type: task.card_type,
                status: task?.status
            });
        }
    });
  
    return result;
}

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(null)
    const [reRender, setReRender] = useState(false);
    const [task, setTask] = useState(null);
    const [searchFor, setSearchFor] = useState('');
    const [filter, setFilter] = useState('')

    const fetchData = async () => {
        const filterMap =  {
            'All': '',
            'To Do': 'to-do',
            'On Progress': 'in-progress',
            'QA': 'qa',
            'Completed': 'completed'
        };

        const params = {
            searchFor,
            filter: filterMap[filter]
        }
        axiosInstance
            .get(`/tasks`, { params })
            .then((response) => {
                setTasks(groupTasksByStatus(response?.data?.data))
            })
    }
    
    useEffect(() => {
        fetchData()
    }, [reRender, searchFor, filter]);

    const handleCreate = () => {
        setOpen(true);
    }

    const handleDelete = (id) => {
        setConfirmationDialog(true);
        setDeleteTaskId(id);
    }

    const handleUpdate = (task) => {
        setTask(task);
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setTask(null);
        setOpen(false)
    }

    return (
        <div className='flex flex-col h-screen'>
            {/* Header */}
            <div 
                className='flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-50' 
                style={{boxShadow:'0px 0px 6px 2px #0000001a'}}
            >
                <div className='flex items-center gap-4'>
                    <img src="/jira.png" alt="jira" className='w-5 h-5' />
                    <h1 className='text-2xl font-semibold'>Tasks Management</h1>
                </div>
                <div className='flex gap-4 items-center'>
                    <div>
                        <button 
                            className='bg-[#1976D2] border-0 rounded-lg text-white p-2 hover:brightness-110 transition duration-200 cursor-pointer'
                            style={{boxShadow:'0px 0px 6px 2px #0000001a', width:100}}
                            onClick={handleCreate}
                        >
                            Create Task
                        </button>
                    </div>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        size="small"
                        placeholder='Search'
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '25px',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#90caf9',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1976d2',
                                    borderWidth: '1px',
                                },
                            },
                            '& .MuiInputLabel-outlined': {
                                transform: 'translate(14px, 14px) scale(1)',
                            },
                            '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                                transform: 'translate(14px, -6px) scale(0.75)',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search 
                                        sx={{ 
                                            fontSize: '20px',
                                            color: 'action.active',
                                            transition: 'color 0.2s ease-in-out',
                                            '&:hover': { 
                                                color: 'primary.light' 
                                            },
                                            '.Mui-focused &': {
                                                color: 'primary.main',
                                                transform: 'scale(1.05)'
                                            }
                                        }} 
                                    />
                                </InputAdornment>
                            ),
                            sx: { paddingLeft: '8px' }
                        }}
                        onChange={(event) => setSearchFor(event?.target.value)}
                        autoComplete='off'
                    />
                   <div>
                        <img 
                            src="/user.jpeg"
                            alt="user"
                            style={{boxShadow:'0px 0px 6px 2px #0000001a'}}
                            className='rounded-full w-12 h-8'
                        />
                   </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex flex-1 overflow-hidden'>
                {/* Sidebar */}
                <div className='flex flex-col gap-4 bg-[#FAFBFC] w-[15%] p-4 overflow-y-auto' 
                     style={{ boxShadow: '6px 0px 6px -2px rgba(0, 0, 0, 0.1)' }}>
                    <h1 className='text-xl font-semibold'>Issues List</h1>
                    {result?.map((issueName) => (
                        <div 
                            key={issueName}
                            className='flex justify-between items-center p-2 hover:bg-[#EFF4FD] rounded-lg cursor-pointer'
                            onClick={() => setFilter(issueName)}
                        >
                            <p className='text-sm'>{issueName}</p>
                            <ArrowRight fontSize='small' />
                        </div>
                    ))}
                </div>

                {/* Task Columns */}
                <div className='flex-1 p-4 overflow-y-auto'>
                    <div className='flex gap-4 h-full'>
                        {tasks?.map((task) => (
                            <div key={task.status} className='flex-1 flex flex-col bg-[#F4F5F7] rounded-lg overflow-hidden min-w-[300px]'>
                                {/* Column Header */}
                                <div className='flex items-center justify-between bg-[#f6f3f3] p-3 sticky top-0 z-10'>
                                    <div className='flex items-center gap-2'>
                                        <p className='m-0 text-[#6f6c6c] text-sm font-semibold uppercase'>{task.status}</p>
                                        <p className='text-[#6f6c6c] font-semibold text-sm'>{task.items.length}</p>
                                    </div>
                                </div>

                                {/* Task List */}
                                <div className='flex-1 overflow-y-auto p-2 space-y-3'>
                                    {task.items.length > 0 ? (
                                        task.items.map((item) => (
                                            <div
                                                key={item.card_no}
                                                className='flex flex-col gap-3 p-3 rounded-lg bg-white'
                                                style={{boxShadow:'0px 0px 6px 2px #0000001a'}}
                                            >
                                                <div className='flex justify-between items-center'>
                                                    <p className='m-0 text-sm font-semibold text-start'>
                                                        {item.title}
                                                    </p>
                                                    <div className='flex gap-1 items-center'>
                                                        <Tooltip title="Edit">
                                                            <IconButton onClick={() => handleUpdate(item)} size="small">
                                                                <BorderColor
                                                                    style={{ fontSize:'16px', color:'#1976d2' }} 
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => handleDelete(item.id)} size="small">
                                                                <Delete 
                                                                    style={{ fontSize:'16px', color:'red' }} 
                                                                />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>

                                                <div className='flex justify-between items-center'>
                                                    <div className='flex gap-1 items-center'>
                                                        {item.card_type === 'Feat' ? 
                                                            <AddIcon className='bg-[#37C224] text-white p-[1px] rounded-[4px]' style={{fontSize:'14px'}} /> :
                                                            <CircleIcon className='bg-[#F6331C] text-white p-[3px] rounded-[4px]' style={{fontSize:'8px'}} />
                                                        }
                                                        <p className='m-0 text-[#6f6c6c] text-xs font-semibold'>{item.card_no}</p>
                                                    </div>
                                                    <img src={item.icon} alt='User' className='w-6 h-6 rounded-full object-cover' />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-center py-4 text-gray-400 text-sm'>
                                            No tasks in this status
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DialogComponent 
                open={open}
                onClose={handleCloseDialog}
                setReRender={setReRender}
                reRender={reRender}
                task={task}
            />

            <ConfirmationDialog 
                open={confirmationDialog}
                onClose={() => setConfirmationDialog(false)}
                id={deleteTaskId}
                setReRender={setReRender}
                reRender={reRender}
            />
        </div>
    )
}

export default Home;