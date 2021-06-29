import React from "react";

const ImageCard = ({ src, name, isSelected, onClick }) => {
  const onCardClick = () => onClick && onClick(!isSelected, name);

  return (
    <div
      className={`image-card ${isSelected ? "selected" : ""}`}
      onClick={onCardClick}
    >
      <div
        className="image-area"
        style={{
          backgroundImage: `url("${src}")`,
        }}
      />
      <p className="label">{name}</p>
    </div>
  );
};

export default ImageCard;
