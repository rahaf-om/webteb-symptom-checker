import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

// Default mock data generator
const generateMockData = () => Array.from({ length: 15 }).map((_, i) => ({
    id: `SUB-${1000 + i}`,
    companyName: i % 3 === 0 ? `HealthCorp ${i}` : `MediCare Clinics ${i}`,
    contactPerson: `Dr. User ${i}`,
    email: `user${i}@example.com`,
    phone: `+962 79 ${String(Math.floor(Math.random() * 10000000)).padStart(8, '0')}`,
    industry: i % 4 === 0 ? 'Hospital' : i % 4 === 1 ? 'Private Clinic' : 'Insurance',
    size: i % 2 === 0 ? '50-200' : '200+',
    message: 'We are interested in integrating the symptom checker...',
    status: ['New', 'Contacted', 'Demo Scheduled', 'Converted', 'Lost'][Math.floor(Math.random() * 5)],
    submissionDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString().split('T')[0],
    notes: i % 5 === 0 ? 'High priority' : '',
    assignee: null,
    activityLog: [
        { text: 'Submission received', time: new Date(Date.now() - 10000000).toISOString() }
    ],
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000)).toISOString()
}));

// Create Context with default values to prevent crashes
const RealTimeContext = createContext({
    submissions: [],
    activities: [],
    unreadCount: 0,
    updateSubmission: () => { },
    deleteSubmission: () => { },
    markAllRead: () => { },
    loading: false
});

export const useRealTime = () => useContext(RealTimeContext);

export const RealTimeProvider = ({ children }) => {
    // Generate initial data on mount
    const [submissions, setSubmissions] = useState([]);
    const [activities, setActivities] = useState([
        { id: 1, text: 'System initialized', time: new Date().toISOString(), type: 'system' }
    ]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Initialize data
    useEffect(() => {
        setSubmissions(generateMockData());
    }, []);

    // Simulate incoming data
    useEffect(() => {
        const interval = setInterval(() => {
            // 20% chance to get a new submission every 30 seconds
            if (Math.random() > 0.8) {
                const id = Math.floor(Math.random() * 1000);
                const newSubmission = {
                    id: `SUB-${2000 + id}`,
                    companyName: `New Clinic ${id}`,
                    contactPerson: `New Lead ${id}`,
                    email: `lead${id}@newclinic.com`,
                    phone: '+962 79 000 0000',
                    industry: 'Private Clinic',
                    size: '10-50',
                    message: 'Hello, I want to know more...',
                    status: 'New',
                    submissionDate: new Date().toISOString().split('T')[0],
                    notes: '',
                    assignee: null,
                    activityLog: [{ text: 'Submission received', time: new Date().toISOString() }],
                    updatedAt: new Date().toISOString(),
                    isNew: true
                };

                setSubmissions(prev => [newSubmission, ...prev]);
                addActivity(`New submission from ${newSubmission.companyName}`, 'success');
                setUnreadCount(prev => prev + 1);
                // Safe check for message object
                if (typeof message !== 'undefined') {
                    message.info(`New submission received: ${newSubmission.companyName}`);
                }
            }
        }, 15000); // Increased frequency for testind (15s)

        return () => clearInterval(interval);
    }, []);

    const addActivity = (text, type = 'info') => {
        setActivities(prev => [{
            id: Date.now(),
            text,
            time: new Date().toISOString(),
            type
        }, ...prev].slice(0, 20)); // Keep last 20
    };

    const updateSubmission = (id, updates) => {
        setSubmissions(prev => prev.map(item => {
            if (item.id === id) {
                // Creates a new array reference for activityLog to ensure React detects change
                const newActivityLog = [...(item.activityLog || [])];

                // Add to activity logs if status changed
                if (updates.status && updates.status !== item.status) {
                    newActivityLog.unshift({
                        text: `Status updated to ${updates.status}`,
                        time: new Date().toISOString()
                    });
                    addActivity(`Status for ${item.companyName} changed to ${updates.status}`, 'warning');
                }

                // Add to activity logs if assignee changed
                if (updates.assignee && updates.assignee !== item.assignee) {
                    newActivityLog.unshift({
                        text: `Assigned to ${updates.assignee}`,
                        time: new Date().toISOString()
                    });
                    addActivity(`${item.companyName} assigned to ${updates.assignee}`, 'info');
                }

                return { ...item, ...updates, activityLog: newActivityLog, updatedAt: new Date().toISOString() };
            }
            return item;
        }));
    };

    const deleteSubmission = (id) => {
        const item = submissions.find(s => s.id === id);
        if (item) {
            setSubmissions(prev => prev.filter(s => s.id !== id));
            addActivity(`Deleted submission from ${item.companyName}`, 'error');
        }
    };

    const markAllRead = () => {
        setSubmissions(prev => prev.map(s => ({ ...s, isNew: false })));
        setUnreadCount(0);
    };

    return (
        <RealTimeContext.Provider value={{
            submissions,
            activities,
            unreadCount,
            updateSubmission,
            deleteSubmission,
            markAllRead,
            loading: false
        }}>
            {children}
        </RealTimeContext.Provider>
    );
};
