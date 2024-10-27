import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './AgentHome.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AgentHome() {
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [agentName, setAgentName] = useState('Agent');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaimCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/agent/claims-by-agent', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                const { approvedClaims, rejectedClaims, totalClaims, agentName } = response.data;
                setApprovedCount(approvedClaims);
                setRejectedCount(rejectedClaims);
                setTotalCount(totalClaims);
                setAgentName(agentName);
            } catch (error) {
                console.error('Error fetching claim counts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClaimCounts();
    }, []);

    const data = {
        labels: ['Approved', 'Rejected', 'Total'],
        datasets: [
            {
                label: 'Claim Counts',
                data: [approvedCount, rejectedCount, totalCount],
                backgroundColor: [
                    'green',
                    'red',
                    '#002e6b',
                ],
                borderColor: [
                    'black',
                    'black',
                    'black',
                ],
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Claim Counts Summary',
            },
        },
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="agent-home">
                    <div className="chart-container">
                        <Bar data={data} options={options} />
                    </div>
                    <div className="table-container">
                        <h2>{agentName}, your claims count is:</h2>
                        <table className="claim-table">
                            <thead>
                                <tr>
                                    <th>Approved</th>
                                    <th>Rejected</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{approvedCount}</td>
                                    <td>{rejectedCount}</td>
                                    <td>{totalCount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default AgentHome;
