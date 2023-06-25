import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent } from 'react';
import { Progress } from 'reactstrap';


function Barchart(){
    const data = [
        {
            name: 'January',
            Assigned: 300,
            Completed: 200,
            InProgress: 100, 
        },
        {
            name: 'February',
            Assigned: 400,
            Completed: 100,
            InProgress: 300, 
        },
        {
            name: 'March',
            Assigned: 500,
            Completed: 300,
            InProgress: 200, 
        },
    ];


    
    return (
        <div className="question">
          <div className="question-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend align="left" wrapperStyle={{
                fontSize: '13px',
              }} verticalAlign='middle' layout='vertical'/>
                <Bar dataKey="Assigned" stackId='a' fill="#1f77b4" />
                <Bar dataKey="Completed" stackId='a' fill="#ff7f0e" />
                <Bar dataKey="InProgress" stackId='a' fill="#2ca02c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}

export default Barchart;