// @flow
import React from 'react';
import { Provider, Subscribe } from 'unstated';
import { Button, Icon } from 'antd';
import CounterContainer from '../containers/Counter';

function Counter() {
  return (
    <Subscribe to={[CounterContainer]}>
      {counter => (
        <div>
          <Button type="primary" onClick={() => counter.decrement()}><Icon type="minus" /></Button>
          <span>{counter.state.count}</span>
          <Button onClick={() => counter.increment()}><Icon type="plus" /></Button>
        </div>
      )}
    </Subscribe>
  );
}

export default () => (
  <Provider>
    <Counter />
  </Provider>
)