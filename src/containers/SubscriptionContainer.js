import React from 'react';
import { Subscribe } from 'unstated';
import isEqual from 'react-fast-compare';
import { Subscription } from 'react-apollo'

class Event extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {container, data, mapDataToState, queryType} = this.props;
    console.log(queryType);
    
    if (data) {
      console.log(`MOUNTED ${JSON.stringify(data)}`);
      container.onNewData(mapDataToState(container.state, data))
    }
  }
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.data, nextProps.data);
  }
  componentDidUpdate() {
    const {container, data, mapDataToState, onUpdate, loading} = this.props;
    console.log(`UPDATED ${JSON.stringify(container)}`);
    console.log(`UPDATED ${JSON.stringify(data)}`);
    !loading && container.onNewData(mapDataToState(container.state, data), (state) => {
      onUpdate && onUpdate(state, true);
    }); 
  }
  render() {
    const { renderer, container } = this.props;
    return (
      <Subscribe to={[container]}>
        {container => (
          renderer(container.state, container)
        )}
      </Subscribe>
    )
  }
}
const SubscriptionContainer = ({container, children, subscription, mapDataToState, onUpdate}) => (
  <Subscribe to={[container]}>
    {_container => (
      <Subscription subscription={subscription}>
        {({ loading, error, data }) => {
          if (error) return `Error! ${error.message}`;
          if (data || loading) {
            return <Event 
            container={_container} 
            queryType={subscription.definitions[0].operation}
            data={data} 
            loading={loading} 
            renderer={children}
            onUpdate={onUpdate}
            mapDataToState={mapDataToState} />
          } else return <div>Lol</div>;
        }}
      </Subscription>
    )}
  </Subscribe>
)

export default SubscriptionContainer;