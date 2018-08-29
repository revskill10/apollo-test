import React from 'react';
import { graphql } from 'react-apollo';
import Dropzone from 'react-dropzone';

import { file_upload_mutation as uploadFile } from '../graphql/file_upload_mutation.graphql';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

@graphql(uploadFile)
export class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this)
  }
  state = {
    loading: null,
    result: ''
  }
  async handleUpload([file]) {
    this.setState({
      loading: true
    })
    const response = await this.props.mutate({
      variables: {file}
    });
    console.log(response);
    this.setState({
      loading: false,
      result: response.data.uploadFile
    })
  }
  render() {
    return (
      <div>
        <style>{
          `img{
            width: 40%;
            height: 40%;
          }          
          `}
        </style>
        Upload Files:
        <Dropzone onDrop={this.handleUpload} />
        <br />
        { this.state.loading && <Spin indicator={antIcon} /> }
        { !this.state.loading && <img src={this.state.result} />}
      </div>
    )
  }
}