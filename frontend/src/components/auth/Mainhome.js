import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './Mainhome.css'
import { Chart as ChartJS, LinearScale, CategoryScale, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    BarElement
);

function MainHome() {
    const [userCount, setUserCount] = useState(0);
    const [agentCount, setAgentCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                const userCountResponse = await axios.get('http://localhost:8080/organization/getUsersCount', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const agentCountResponse = await axios.get('http://localhost:8080/organization/getAgentsCount', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUserCount(userCountResponse.data);
                setAgentCount(agentCountResponse.data);
            } catch (error) {
                console.error('Error fetching user and agent counts:', error);
                setError('Failed to load data.');
            }
        };

        fetchCounts();
    }, []);

    const data = {
        labels: ['Users', 'Agents'],
        datasets: [
            {
                label: 'Count',
                data: [userCount, agentCount],
                backgroundColor: [
                    '#002e6b',
                    '#002e6b',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="main-home">
            <h2>User and Agent Count</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="chart-container">
                <Bar 
                    data={data} 
                    options={options} 
                />
            </div>
        </div>
    );
    
}

export default MainHome;
