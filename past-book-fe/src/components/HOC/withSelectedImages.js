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
      this.setState({ isFetching: true });

      const [err, data] = await API.get(`${STATIC_AUTHOR_ID}/selected-images`);

      if (err) {
        message.error("Unable to fetch selected image data. Please try again");
        this.setState({ isFetching: false, hasError: true });
        return;
      }

      this.setState({ data: data || [], isFetching: false, hasError: false });
    }

    render() {
      return <WrapperComponent {...this.props} selectedImages={this.state} />
    }
  }
}

export default withSelectedImages;
