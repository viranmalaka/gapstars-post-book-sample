import React, { useEffect, useState } from 'react';
import withSelectedImages from "../components/HOC/withSelectedImages";
import API, { OutsideAPI } from "../utils/api";
import {Col, message, Row } from "antd";
import {STATIC_AUTHOR_ID, USER_IMAGES_URL} from "../utils/constants";
import ImageCard from "../components/image-card";
import ThreeColumnDummyImageLoading from "../components/three-column-dummy-image-loading";
import {isAvailableInArray} from "../utils/common-utils";

const AllPhotos = ({ selectedImages }) => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedImages.data) {
      (async () => {
        setLoading(true);
        // filter and fetch only the required image list from the server.
        // with the current endpoint, it's impossible.
        const [err, data] = await OutsideAPI.get(USER_IMAGES_URL);

        if (err || !data) {
          message.error('Unable to fetch image data. Please retry');
          setLoading(false);
          return;
        }

        const { author, entries } = data;
        setUser(author);

        // do the filtering locally
        const tempResult = [];
        selectedImages.data.forEach(imgId => {
          const entryObj = entries.filter(entry => entry.id === imgId)[0];
          tempResult.push(entryObj);
        });
        setImages(tempResult);

        setLoading(false);
      })();
    }
  }, [selectedImages.data]);

  const onAddImage = async (id) => {
    const updatedImageSequence = [...selectedImages.data, id];
    selectedImages.updateImageList(updatedImageSequence);
  }

  const onRemoveImage = async (id) => {
    const updatedImageSequence = selectedImages.data.filter(imgId => imgId !== id);
    selectedImages.updateImageList(updatedImageSequence);
  }


  if (loading) {
    return <ThreeColumnDummyImageLoading />
  }

  return (
    <Row gutter={[25, 25]}>
      {images.map(image => <Col span={8}>
        <ImageCard
          url={image.picture}
          id={image.id}
          isSelected={isAvailableInArray(selectedImages.data, image.id)}
          onDeselectImage={onRemoveImage}
          onSelectImage={onAddImage}
          showDeleteBtn={onRemoveImage}
        />
      </Col>)
      }
    </Row>
  );
};

export default withSelectedImages(AllPhotos);
