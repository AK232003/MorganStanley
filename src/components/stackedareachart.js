import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import React, { PureComponent } from 'react';
import { Progress } from 'reactstrap';


function Stackedareachart({data1}){
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
    const graphData = data.map((item) => ({
      label: item.name,
      Assigned: item.Assigned,
      Completed: item.Completed,
      InProgress: item.InProgress,
    }));

    
    return (
        <div className="question">
          <div className="question-container">
            <ResponsiveContainer width="100%" height={200}>
            <AreaChart
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend align="left" wrapperStyle={{
                fontSize: '13px',
              }} verticalAlign='middle' layout='vertical'/>
            <Area
                type="monotone"
                dataKey="Assigned"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
            />
            <Area
                type="monotone"
                dataKey="Completed"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
            />
            <Area
                type="monotone"
                dataKey="InProgress"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
            />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}

export default Stackedareachart;