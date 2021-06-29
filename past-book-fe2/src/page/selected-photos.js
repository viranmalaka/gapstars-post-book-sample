import React, { useEffect, useState } from "react";
import withSelectedImages from "../components/HOC/with-selected-images";
import ImageCard from "../components/image-card";
import API from "../utils/api";
import { message } from "antd";
import Drawer from "../components/drawer";
import SequencingTable from "../components/sequencing-table";

const SelectedPhotos = ({ selectedImages }) => {
  const [loading, setLoading] = useState(false);
  const [imagesById, setImages] = useState({});

  const [tempImages, setTempImages] = useState([...selectedImages.data]);

  useEffect(() => {
    setTempImages(selectedImages.data);
    (async () => {
      if (selectedImages.data.length > 0) {
        setLoading(true);
        const query = selectedImages.data.join(",");
        const [err, data] = await API.get(
          `uploaded-images/filter?ids=${query}`
        );
        if (err) {
          message.error("Failed to fetch data");
        } else {
          setImages(
            data.images.reduce((p, c) => {
              p[c.id] = c;
              return p;
            }, {})
          );
        }
        setLoading(false);
      }
    })();
  }, [selectedImages.data]);

  const handleCardSelectionChanged = () => {
    if (tempImages.length === selectedImages.data.length) {
      selectedImages.updateImageList(tempImages);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Drawer onClose={handleCardSelectionChanged}>
        <SequencingTable
          data={tempImages}
          onChange={(updated) => setTempImages(updated)}
        />
      </Drawer>
      <div className="image-container">
        {selectedImages.data.map(
          (img) =>
            imagesById[img] && (
              <ImageCard
                key={imagesById[img].id}
                src={`${imagesById[img].picture}`}
                name={img}
              />
            )
        )}
      </div>
    </div>
  );
};

export default withSelectedImages(SelectedPhotos);
