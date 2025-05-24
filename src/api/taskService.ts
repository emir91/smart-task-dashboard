import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export type ApiTask = {
    id: number;
    title: string;
    completed: boolean;
};

export const fetchTasks = async (): Promise<ApiTask[]> => {
    const response = await axios.get<ApiTask[]>(`${API_URL}/todos?_limit=10`);
    return response.data;
};
