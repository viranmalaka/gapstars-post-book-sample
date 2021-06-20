import React from 'react';
import withSelectedImages from "../components/HOC/withSelectedImages";

const SelectedPhotos = ({ selectedImages }) => {
  return (
    <div>
      {JSON.stringify(selectedImages)}
    </div>
  );
};

export default withSelectedImages(SelectedPhotos);
