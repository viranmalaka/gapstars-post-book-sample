import React from 'react';
import withSelectedImages from "../components/HOC/withSelectedImages";

const AllPhotos = ({ selectedImages }) => {
  return (
    <div>
      {JSON.stringify(selectedImages)}
    </div>
  );
};

export default withSelectedImages(AllPhotos);
