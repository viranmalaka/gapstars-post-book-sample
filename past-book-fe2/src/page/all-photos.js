import React, { useEffect, useState } from "react";
import ImageCard from "../components/image-card";
import API from "../utils/api";
import { message } from "antd";
import withSelectedImages from "../components/HOC/with-selected-images";
import { isAvailableInArray } from "../utils/common-utils";

const AllPhotos = ({ selectedImages, onImageCountChanged }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [err, data] = await API.get("uploaded-images");
      if (err) {
        message.error("Data not loaded");
      } else {
        setImages(data.images);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    onImageCountChanged(selectedImages.data.length);
  }, [selectedImages.data]);

  const handleCardSelectionChanged = async (select, id) => {
    if (select) {
      await selectedImages.updateImageList([...selectedImages.data, id]);
    } else {
      const updatedImageSequence = selectedImages.data.filter(
        (imgId) => imgId !== id
      );
      await selectedImages.updateImageList(updatedImageSequence);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-container">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          src={`${img.picture}`}
          name={img.id}
          isSelected={isAvailableInArray(selectedImages.data, img.id)}
          onClick={handleCardSelectionChanged}
        />
      ))}
    </div>
  );
};

export default withSelectedImages(AllPhotos);
