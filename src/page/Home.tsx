import React from 'react'
import { Button, Card, Col, Row, Select } from 'antd';
import './Home.scss';
import { CardComponent } from '../component/CardComponent';
const { Option } = Select;
const Home = () => {
  return (
    <>
      <div className="app-container">
      <Row gutter={[16, 16]} justify="center" className="card-row">
        <Col xs={24} sm={12} md={8}>
          <CardComponent titleKey="Card1Title" descriptionKey="Card1Description" path="/card1" />
        </Col>

        <Col xs={24} sm={12} md={8}>
          <CardComponent titleKey="Card2Title" descriptionKey="Card2Description" path="/card2" />
        </Col>

        <Col xs={24} sm={12} md={8}>
          <CardComponent titleKey="Card3Title" descriptionKey="Card3Description" path="/card3" />
        </Col>
      </Row>
      </div>
  </>
  )
}

export default Home