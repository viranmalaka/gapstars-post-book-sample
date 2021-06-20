import React from 'react';
import {Button, Card, Switch} from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const ImageCard = ({url, id, onSelectImage, onDeselectImage, isSelected, showSwitch, showDeleteBtn}) => {

  const onSelectionChanged = async (selected) => {
    selected ? onSelectImage(id) : onDeselectImage(id);
  };

  return (
      <Card hoverable className='no-body-antd-card' cover={<img src={'https://placeimg.com/250/250/any'} />}>
        <div className="action-area">
          {showSwitch && <Switch onChange={onSelectionChanged} checked={isSelected} /> }
          {showDeleteBtn && <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => onSelectionChanged(false)} /> }
        </div>
      </Card>
  );
};

export default ImageCard;
