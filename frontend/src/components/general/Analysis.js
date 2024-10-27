import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './Analysis.css';
import { Chart as ChartJS, LinearScale, CategoryScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

ChartJS.register(
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
);

function Analysis() {
    const [dailyClaimsData, setDailyClaimsData] = useState([]);
    const [agentClaimsData, setAgentClaimsData] = useState([]);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');
    const [minClaims, setMinClaims] = useState('');
    const [maxClaims, setMaxClaims] = useState('');

    useEffect(() => {
        const fetchDailyClaimsData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/organization/getDailyClaimsCount', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDailyClaimsData(response.data);
            } catch (err) {
                setError('Failed to load daily claims data.');
            }
        };

        const fetchAgentClaimsData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/organization/getAgentClaimsCount', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAgentClaimsData(response.data);
            } catch (err) {
                setError('Failed to load agent claims data.');
            }
        };

        fetchDailyClaimsData();
        fetchAgentClaimsData();
    }, []);

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const filteredAgentClaims = [...agentClaimsData]
        .filter(agent => 
            agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) && 
            (minClaims === '' || agent.claimsCount >= Number(minClaims)) && 
            (maxClaims === '' || agent.claimsCount <= Number(maxClaims))
        )
        .sort((a, b) => {
            if (sortConfig.key) {
                const order = sortConfig.direction === 'asc' ? 1 : -1;
                if (a[sortConfig.key] < b[sortConfig.key]) return -1 * order;
                if (a[sortConfig.key] > b[sortConfig.key]) return 1 * order;
            }
            return 0;
        });

    const lineChartData = {
        labels: dailyClaimsData.map(data => data.date),
        datasets: [
            {
                label: 'Daily Claims Count',
                data: dailyClaimsData.map(data => data.count),
                backgroundColor: 'rgba(0, 46, 107, 0.2)',
                borderColor: '#002e6b',
                borderWidth: 2,
                pointBackgroundColor: '#002e6b',
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <h2>Claims Analysis</h2>
            <div className="analysis-container">

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="chart-container">
                    <h3 id='analysis-head'>Updated Claims Count by Date</h3>
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>

                <div className="table-container">
                    <h3>Updated Claims Count by Agent</h3>

                    <div className="search-filter-container">
                        <label><b>Search:</b></label>
                        <input
                            type="text"
                            placeholder="Search by agent name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />

                        <div className="filter-container">
                            <label><b>filter:</b></label>
                            <input
                                type="number"
                                placeholder="More than"
                                value={minClaims}
                                onChange={(e) => setMinClaims(e.target.value)}
                                className="filter-input"
                            />
                            <input
                                type="number"
                                placeholder="Less than"
                                value={maxClaims}
                                onChange={(e) => setMaxClaims(e.target.value)}
                                className="filter-input"
                            />
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className='ok' onClick={() => handleSort('agentName')}>Agent Name <img className="sort-icon" src="sort.png" alt="Sort" /></th>
                                <th className='ok' onClick={() => handleSort('claimsCount')}>Claims Count <img className="sort-icon" src="sort.png" alt="Sort" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAgentClaims.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.agentName}</td>
                                    <td>{data.claimsCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Analysis;
