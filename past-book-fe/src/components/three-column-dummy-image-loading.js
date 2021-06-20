import React from 'react';
import {Card, Col, Row, Skeleton, Spin} from "antd";

const ThreeColumnDummyImageLoading = () => {
  const tempThreeColArray = Array(3).fill({});
  return <Row gutter={[25, 25]}>
    {tempThreeColArray.map(() =>
      <Col span={8}>
        <Spin>
          <Card className="no-body-antd-card loading" cover={<Skeleton.Image />} />
        </Spin>
      </Col>
    )}
  </Row>
};

export default ThreeColumnDummyImageLoading;
