import React from "react";
import API from "../../utils/api";
import { STATIC_AUTHOR_ID } from "../../utils/constants";
import { message } from "antd";

const withSelectedImages = (WrapperComponent) => {
  return class extends React.Component {
    state = {
      data: [],
      isFetching: false,
      hasError: false,
      updateImageList: () => {}, // define dummy function for the consistency.
    };

    async componentDidMount() {
      this.setState({
        isFetching: true,
        updateImageList: this.updateImageList,
      });

      const [err, data] = await API.get(`${STATIC_AUTHOR_ID}/selected-images`);

      if (err) {
        message.error("Unable to fetch selected image data. Please try again");
        this.setState({ isFetching: false, hasError: true });
        return;
      }

      let selectedImageData;
      if (data === null) {
        // only execute at the first time, there's nothing on the DB for this user. so create one entry
        const [createError] = await API.post(
          `${STATIC_AUTHOR_ID}/selected-images`,
          {
            imageSequence: [],
          }
        );
        if (createError) {
          message.error("Something went wrong. Failed to create entries");
        }
        selectedImageData = [];
      } else {
        selectedImageData = data.imageSequence;
      }

      this.setState({
        data: selectedImageData,
        isFetching: false,
        hasError: false,
      });
    }

    updateImageList = async (updateSequence) => {
      const [err] = await API.patch(`${STATIC_AUTHOR_ID}/selected-images`, {
        updatedImageSequence: updateSequence,
      });

      if (err) {
        message.error("Failed to update, Please try again");
        return;
      }

      // use api results for more updated data (can be helped on concurrent edits)
      return this.setState({
        data: updateSequence,
      });
    };

    render() {
      return <WrapperComponent {...this.props} selectedImages={this.state} />;
    }
  };
};

export default withSelectedImages;
