import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PieChart } from 'react-minimal-pie-chart';


const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

export default function Chart() {
  const theme = useTheme();

  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/categorycount`)
    ]).then((res) => {
      console.log(res);
      setCategoryCount(prev => [...prev, ...res[0].data])
    })
    .catch(error => {
      console.log(error.message, "problem");
    })
  }, []);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const categories = categoryCount.map((category, index) => {
    return { title: category.name, value: parseInt(category.count), color: COLORS[index] }
  })
  
  // console.log(categories)
  return (
      <div>
        <Typography component="p" variant="h4" align='center'>
          Category Breakdown
      </Typography>
        <br />
        <PieChart data={categories} label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`} labelStyle={{
          ...defaultLabelStyle,
        }}/>
      </div>
  );
}