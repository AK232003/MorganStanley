import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent } from 'react';
import { Progress } from 'reactstrap';


function Linechart({data}){
    const data1 = [
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

    // console.log(data)
    const graphData = data1.map((item) => ({
      label: item.name,
      Assigned: item.Assigned,
      Completed: item.Completed,
      InProgress: item.InProgress,
    }));

    
    return (
        <div className="question">
          <div className="question-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend align="left" wrapperStyle={{
                fontSize: '13px',
              }} verticalAlign='middle' layout='vertical'/>
                <Line dataKey="Assigned" stackId='a' stroke="#1f77b4" />
                <Line dataKey="Completed" stackId='a' stroke="#ff7f0e" />
                <Line dataKey="InProgress" stackId='a' stroke="#2ca02c" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}

export default Linechart;