import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTasks } from '../api/taskService';
import { setTasks } from '../redux/features/tasks/taskSlice';


const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.tasks.tasks);

    useEffect(() => {   
       const loadTasks = async () => {
        try {
            const tasks = await fetchTasks();
            const formattedTasks = tasks.map(task => ({
                id: task.id.toString(),
                title: task.title,
                status: task.completed ? 'done' : 'todo' as 'done' | 'todo',
            }));
            dispatch(setTasks(formattedTasks));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
       }
       loadTasks();
    }, [dispatch]);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;
