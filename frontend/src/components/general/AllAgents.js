import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './All.css';

const AllAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/organization/getAllAgents', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setAgents(response.data);
            } catch (error) {
                console.error('Error fetching agents:', error);
                setError('An error occurred while fetching agents.');
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const handleDeleteAgent = async (username) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this agent?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete('http://localhost:8080/organization/admin/delete', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: { username }
            });
            if (response.status === 200) {
                setAgents(agents.filter(agent => agent.username !== username));
            } else {
                console.error('Failed to delete agent:', response.data.message);
                setError(response.data.message || 'Failed to delete agent.');
            }
        } catch (error) {
            console.error('Error deleting agent:', error);
            setError('An error occurred while deleting the agent.');
        }
    };

    if (loading) {
        return <div>Loading agents...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }
    
    return (
        <div className="all-agents">
            <h2>All Agents</h2>
            {agents.length === 0 ? (
                <p>No agents found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map(agent => (
                            <tr key={agent.id}>
                                <td>{agent.id}</td>
                                <td>{agent.username}</td>
                                <td>{agent.email}</td>
                                <td>{agent.phoneNumber}</td>
                                <td>
                                    <button id='delete-agent' onClick={() => handleDeleteAgent(agent.username)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllAgents;
