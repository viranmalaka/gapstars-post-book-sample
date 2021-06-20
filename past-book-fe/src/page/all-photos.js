import React, { useEffect, useState } from 'react';
import withSelectedImages from '../components/HOC/withSelectedImages';
import { OutsideAPI } from '../utils/api';
import { Col, message, Row } from 'antd';
import { USER_IMAGES_URL } from '../utils/constants';
import ImageCard from '../components/image-card';
import ThreeColumnDummyImageLoading from '../components/three-column-dummy-image-loading';
import { isAvailableInArray } from '../utils/common-utils';

const AllPhotos = ({ selectedImages }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [err, data] = await OutsideAPI.get(USER_IMAGES_URL);

      if (err || !data) {
        message.error('Unable to fetch image data. Please retry');
        setLoading(false);
        return;
      }

      const { author, entries } = data;
      setUser(author);
      setImages(entries);
      setLoading(false);
    })();
  }, []);

  const onAddImage = async (id) => {
    const updatedImageSequence = [...selectedImages.data, id];
    await selectedImages.updateImageList(updatedImageSequence);
  };

  const onRemoveImage = async (id) => {
    const updatedImageSequence = selectedImages.data.filter((imgId) => imgId !== id);
    await selectedImages.updateImageList(updatedImageSequence);
  };

  if (loading) {
    return <ThreeColumnDummyImageLoading />;
  }

  return (
    <Row gutter={[25, 25]}>
      {images.map((image) => (
        <Col md={{ span: 8 }} xl={{ span: 6 }} key={image.id}>
          <ImageCard
            url={image.picture}
            id={image.id}
            isSelected={isAvailableInArray(selectedImages.data, image.id)}
            showSwitch
            onDeselectImage={onRemoveImage}
            onSelectImage={onAddImage}
          />
        </Col>
      ))}
    </Row>
  );
};

export default withSelectedImages(AllPhotos);
