import React from 'react';
import {VictoryCandlestick} from 'victory';

const data = [
  {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
  {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
  {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
  {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
  {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5}
];

const App = () => 
  <VictoryCandlestick
  data={data}
  />

export default App;