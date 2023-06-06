import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Colors_Scheme = (num) => {
    const colors = {
        bg: [],
        brd: [],
    };
    for (let i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        const color1 = `rgba(${r}, ${g}, ${b}, 0.3)`;
        const color2 = `rgba(${r}, ${g}, ${b}, 1)`;
        colors['bg'].push(color1);
        colors['brd'].push(color2);
    }
    return colors;
};

function Pie_chart(labels_in, dt_in, title_in){
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
            }
        ]
    });

    useEffect(() => {
        const labels = labels_in.labels;
        const values = labels_in.data;
        const lbll = labels_in.title;
        const scheme = Colors_Scheme(labels.length);
        const bgcolors = scheme.bg;
        const brdcolors = scheme.brd;

        setChartData(prevChartData => ({
            ...prevChartData,
            labels,
            datasets : [
                {
                    ...prevChartData.datasets[0],
                    label: lbll,
                    data: values,
                    backgroundColor: bgcolors,
                    borderColor: brdcolors,
                    borderWidth: 2,
                    hoverOffset: 4,
                }
            ]
        }))

    }, [labels_in, dt_in]);

    return (
            <Pie 
                width = "30%"
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart',
                            position: "bottom",
                            font: {
                                size: 20,
                                weight: 'bold',
                            },
                        },
                        legend: {
                            display: true,
                            position: "left",
                            align: "center",
                            labels: {
                                pointStyle: 'circle',
                            },
                        },
                    },
                    height: 1000,
                    width: 1000,
                }}
                data={chartData}
            />
    )
}

export default Pie_chart;