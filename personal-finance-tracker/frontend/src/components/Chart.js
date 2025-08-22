import React from 'react';
import { LineChart, Line, PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
    const incomeData = data.map(item => ({ name: item.date, income: item.income }));
    const expenseData = data.map(item => ({ name: item.date, expense: item.expense }));

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={incomeData}>
                    <Line type="monotone" dataKey="income" stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={expenseData} dataKey="expense" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;