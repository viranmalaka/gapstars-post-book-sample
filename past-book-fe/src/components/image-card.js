import React from 'react';
import {Card, Switch} from "antd";
import API from "../utils/api";
import {STATIC_AUTHOR_ID} from "../utils/constants";

const ImageCard = ({url, id, onSelectImage, onDeselectImage, isSelected}) => {

  const onSelectionChanged = async (selected) => {
    selected ? onSelectImage(id) : onDeselectImage(id);
  };

  return (
      <Card hoverable className='no-body-antd-card' cover={<img src={'https://placeimg.com/250/250/any'} />}>
        <div className="action-area">
          <Switch onChange={onSelectionChanged} checked={isSelected} />
        </div>
      </Card>
  );
};

export default ImageCard;
