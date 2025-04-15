import { forwardRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Autocomplete, TextField } from '@mui/material';
import axiosInstance from '../utility/axios-instance';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const statuses = { 
  'Todo': 'to-do',
  'In-Progress': 'in-progress',
  'Completed': 'completed'
};

const issueTypes = ['Bug', 'Feat'];
const statusOptions = ['Todo', 'In-Progress', 'Completed'];

const DialogComponent = ({ open, onClose, setReRender, reRender, task }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        git_branch_name: '',
        card_type: 'Feat',
        status: 'Todo'
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                git_branch_name: task.git_branch_name || '',
                card_type: task.card_type || 'Feat',
                status: Object.keys(statuses).find(key => statuses[key] === task.status) || 'Todo'
            });
        } else {
            setFormData({
                title: '',
                description: '',
                git_branch_name: '',
                card_type: 'Feat',
                status: 'Todo'
            });
        }
    }, [task]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            title: formData.title,
            description: formData.description,
            git_branch_name: formData.git_branch_name,
            card_type: formData.card_type,
            status: statuses[formData.status],
        };

        try {
            if (task) {
                await axiosInstance.put(`/tasks/${task.id}`, { data: payload });
            } else {
                await axiosInstance.post('/tasks/create', { data: payload });
            }
            onClose();
            setReRender(!reRender);
        } catch (error) {
            alert(error.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                margin: 1,
                width: '100%',
                maxHeight: 'calc(100vh - 32px)',
                overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ p: 3, pb: 1 }}>{task ? 'Edit Task' : 'Create Task'}</DialogTitle>
            <DialogContent dividers sx={{ p: 3, overflow: 'hidden' }}>
                <div className="grid grid-cols-2 gap-[20px]" style={{ overflow: 'visible' }}>
                    <TextField
                        required
                        label="Task Name"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        fullWidth
                        sx={{ gridColumn: 'span 1' }}
                    />

                    <TextField
                        label="Git Branch Name"
                        value={formData.git_branch_name}
                        onChange={(e) => setFormData({...formData, git_branch_name: e.target.value})}
                        fullWidth
                        sx={{ gridColumn: 'span 1' }}
                    />

                    <Autocomplete
                        options={issueTypes}
                        value={formData.card_type}
                        onChange={(_, value) => setFormData({...formData, card_type: value})}
                        renderInput={(params) => (
                            <TextField {...params} label="Issue Type" required />
                        )}
                        fullWidth
                        sx={{ gridColumn: 'span 1' }}
                    />

                    <Autocomplete
                        options={statusOptions}
                        value={formData.status}
                        onChange={(_, value) => setFormData({...formData, status: value})}
                        renderInput={(params) => (
                            <TextField {...params} label="Status" required />
                        )}
                        fullWidth
                        sx={{ gridColumn: 'span 1' }}
                    />

                    <TextField
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        multiline
                        minRows={3}
                        fullWidth
                        sx={{ gridColumn: 'span 2' }}
                    />

                    <div className="flex justify-end gap-[8px]" style={{ gridColumn: 'span 2' }}>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                            {task ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;