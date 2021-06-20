import React from 'react';
import {Card, Col, Row, Skeleton, Spin} from "antd";

const ThreeColumnDummyImageLoading = () => {
  const tempThreeColArray = Array(3).fill({});
  return <Row gutter={[25, 25]}>
    {tempThreeColArray.map((_, index) =>
      <Col md={{span: 8}} xl={{span: 6}} key={index}>
        <Spin>
          <Card className="no-body-antd-card loading" cover={<Skeleton.Image />} />
        </Spin>
      </Col>
    )}
  </Row>
};

export default ThreeColumnDummyImageLoading;
