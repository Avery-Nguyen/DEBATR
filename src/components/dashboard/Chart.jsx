import React, { useEffect, useState } from 'react';
import axios from 'axios';


// import { useTheme } from '@material-ui/core/styles';
import PieChart from '@bit/recharts.recharts.pie-chart';
import Pie from '@bit/recharts.recharts.pie';
import Typography from '@material-ui/core/Typography';




// const data02 = [
//   { name: 'A1', value: 100 },
//   { name: 'A2', value: 300 },
//   { name: 'B1', value: 100 },
//   { name: 'B2', value: 80 },
//   { name: 'B3', value: 40 },
//   { name: 'B4', value: 30 },
//   { name: 'B5', value: 50 },
//   { name: 'C1', value: 100 },
//   { name: 'C2', value: 200 },
//   { name: 'D1', value: 150 },
//   { name: 'D2', value: 50 },
// ];





export default function Chart() {
  // const theme = useTheme();

  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/categorycount`)
    ]).then((res) => {
      // console.log(data[0].data, "this is data in chart")
      // console.log(Object.values(data[0].data));
      // console.log(data[0].data[0].count, "this is data in orders")
      setCategoryCount(prev => [...prev, ...res[0].data])
      console.log(categoryCount)
    })
      .catch(error => {
        console.log(error.message, "problem");
      })
  }, [categoryCount]);

  const categories = categoryCount.map((category) => {
    console.log(category);
    let final = {}
    final = { name: category.name, value: category.count }
    console.log(final)
    return final
  })
  console.log(categoryCount)

  const data01 = [
    { categories },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  ];

  return (
    <React.Fragment>
      <div>
        <Typography component="p" variant="h4" align='center'>
          Category Breakdown
      </Typography>
        <br />
        <PieChart align='center' width={200} height={200} position='absolute' zIndex='3'>
          <Pie data={data01} dataKey="value" cx={130} cy={100} outerRadius={50} fill="#8884d8" label />
          {/* <Pie data={data02} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label /> */}
        </PieChart>
      </div>
    </React.Fragment>
  );
}