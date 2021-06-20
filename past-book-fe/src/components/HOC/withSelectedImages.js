import React from 'react';
import API from "../../utils/api";
import {STATIC_AUTHOR_ID} from "../../utils/constants";
import {message} from "antd";

const withSelectedImages = (WrapperComponent) => {
  return class extends React.Component {

    state = {
      data: [],
      isFetching: false,
      hasError: false,
    }

    async componentDidMount() {
      this.setState({ isFetching: true, onImageSequenceUpdate: this.notifyImageUpdates });

      const [err, data] = await API.get(`${STATIC_AUTHOR_ID}/selected-images`);

      if (err) {
        message.error("Unable to fetch selected image data. Please try again");
        this.setState({ isFetching: false, hasError: true });
        return;
      }

      let selectedImageData;
      if (data === null) {
        // only execute at the first time, there's nothing on the DB for this user. so create one entry
        const [createError] = await API.post(`${STATIC_AUTHOR_ID}/selected-images`, {
          imageSequence: []
        });
        if (createError) {
          message.error('Something went wrong. Failed to create entries');
        }
        selectedImageData = [];
      } else {
        selectedImageData = data.imageSequence;
      }

      this.setState({ data: selectedImageData, isFetching: false, hasError: false });
    }

    notifyImageUpdates = (newImageSequence) => {
      this.setState({
        data: newImageSequence,
      })
    }

    render() {
      return <WrapperComponent {...this.props} selectedImages={this.state} />
    }
  }
}

export default withSelectedImages;
