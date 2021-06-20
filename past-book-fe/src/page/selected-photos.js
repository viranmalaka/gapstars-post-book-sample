import React, { useEffect, useState } from 'react';
import withSelectedImages from '../components/HOC/withSelectedImages';
import { OutsideAPI } from '../utils/api';
import { Col, message, Row, Button, Drawer } from 'antd';
import { USER_IMAGES_URL } from '../utils/constants';
import ImageCard from '../components/image-card';
import ThreeColumnDummyImageLoading from '../components/three-column-dummy-image-loading';
import { isAvailableInArray } from '../utils/common-utils';
import ImageSequenceTable from '../components/image-sequence-table';

const SelectedPhotos = ({ selectedImages }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [drawer, showDrawer] = useState(false);

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

        const { entries } = data;

        // do the filtering locally
        const tempResult = [];
        selectedImages.data.forEach((imgId) => {
          const entryObj = entries.filter((entry) => entry.id === imgId)[0];
          tempResult.push(entryObj);
        });
        setImages(tempResult);

        setLoading(false);
      })();
    }
  }, [selectedImages.data]);

  const onRemoveImage = async (id) => {
    const updatedImageSequence = selectedImages.data.filter((imgId) => imgId !== id);
    await selectedImages.updateImageList(updatedImageSequence);
  };

  if (loading) {
    return <ThreeColumnDummyImageLoading />;
  }

  return (
    <>
      <Row gutter={[25, 25]}>
        <Col span={24} className="float-left-container">
          <Button onClick={() => showDrawer(true)}>Sequence</Button>
        </Col>
        {images.map((image) => (
          <Col md={{span: 8}} xl={{span: 6}}  key={image.id}>
            <ImageCard
              url={image.picture}
              id={image.id}
              isSelected={isAvailableInArray(selectedImages.data, image.id)}
              showDeleteBtn
              onDeselectImage={onRemoveImage}
            />
          </Col>
        ))}
      </Row>
      <Drawer
        title="Sequence your Selected Images"
        placement="right"
        closable={false}
        onClose={() => showDrawer(false)}
        visible={drawer}
        width={400}
      >
        <ImageSequenceTable
          data={images}
          onChange={(updateList) => {
            showDrawer(false);
            selectedImages.updateImageList(updateList.map((entry) => entry.id));
          }}
        />
      </Drawer>
    </>
  );
};

export default withSelectedImages(SelectedPhotos);
