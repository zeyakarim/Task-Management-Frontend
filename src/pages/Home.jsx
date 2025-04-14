import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import axiosInstance from '../utility/axios-instance';
import DialogComponent from './Dialog';
import { BorderColor, Delete, Edit } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

const groupTasksByStatus = (tasks) => {
    // Define status mapping
    const statusMap = {
        'to-do': 'To Do',
        'in-progress': 'On Progress',
        'completed': 'Completed'
    };
  
    // Initialize the result structure
    const result = [
        { status: 'To Do', items: [] },
        { status: 'On Progress', items: [] },
        { status: 'Completed', items: [] }
    ];

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
  
    return result.filter(group => group.items.length > 0);
}

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(null)
    const [reRender, setReRender] = useState(false);
    const [task, setTask] = useState(null);

    const fetchData = async ( ) => {
        axiosInstance
            .get('/tasks')
            .then((response) => {
                setTasks(groupTasksByStatus(response?.data?.data))
            })
    }
    
    useEffect(() => {
        fetchData()
    }, [reRender]);

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
        <div>
            <h2 className='text-2xl font-bold'>Task Management</h2>
            <div className='p-[20px] rounded-[8px]' style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className='flex justify-between border-b-1 border-[#ede7e7] pb-[10px]'>
                    <h2 className='m-0' style={{margin:0}}>Tasks</h2>
                    <button 
                        className='bg-[#e9aa08] border-0 rounded-[8px] text-[#fff] p-[8px] hover:brightness-110 transition duration-200 cursor-pointer'
                        style={{ boxShadow: '0 4px 12px #f3f3f3, 0 1px 3px #f3f3f3' }}
                        onClick={handleCreate}
                    >
                        Create Task
                    </button>
                </div>

                <div className='flex justify-between mt-[30px] gap-[20px]'>
                    {tasks?.map((task) => (
                        <div key={task?.status} className='w-[32%] gap-[20px] flex flex-col'>
                            <div className='flex flex-row justify-center gap-[10px] bg-[#f6f3f3] p-[12px] rounded-[8px]'>
                                <p className='w-[15px] h-[15px] border-2 border-[#b6b2b2] rounded-[50%] m-[0px]'></p>
                                <p className='m-[0px] text-[#6f6c6c] text-[15px] font-[600]'>{task?.status}</p>
                            </div>

                            {task?.items?.map((item) => (
                                <div
                                    key={item?.card_no}
                                    className='flex flex-col gap-[20px] p-[12px] rounded-[8px] border-2 border-[#f6f3f3]'
                                    style={{ boxShadow: '0 4px 12px #f3f3f3, 0 1px 3px #f3f3f3' }}
                                >
                                    <div className='flex justify-between items-center'>
                                        <p className='m-[0px] text-[15px] font-[600] text-start'>
                                            {item?.title}
                                        </p>

                                        <div className='flex gap-[5px] items-center'>
                                            <Tooltip title="Edit" onClick={() => handleUpdate(item)}>
                                                <IconButton>
                                                    <BorderColor
                                                        style={{ fontSize:'18px', color:'#1976d2', padding:0 }} 
                                                        className='hover:brightness-110 transition duration-200 cursor-pointer' 
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" onClick={() => handleDelete(item?.id)}>
                                                <IconButton>
                                                    <Delete 
                                                        style={{ fontSize:'18px', color:'red' }} 
                                                        className='hover:brightness-110 transition duration-200 cursor-pointer' 
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <div className='flex justify-between gap-[4px] items-center'>
                                        <div className='flex gap-[4px] items-center'>
                                            {item?.card_type === 'Feat' ? 
                                                <AddIcon className='bg-[#37C224] text-[#fff] p-[1px] rounded-[4px]' style={{fontSize:'16px'}} /> :
                                                <CircleIcon className='bg-[#F6331C] text-[#fff] p-[4px] rounded-[4px]' style={{fontSize:'8px'}} />
                                            }
                                            <p className='m-[0px] text-[#6f6c6c] text-[13px] font-[600]'>{item?.card_no}</p>
                                        </div>
                                        <img src={item.icon} alt='User' className='w-[30px] h-[30px] rounded-full object-cover' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
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