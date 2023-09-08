import BottomBar from '@/components/BottomBar'
import FormTourist from '@/components/FormTourist'
import SideBar from '@/components/SideBar'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function TouristEdit() {

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={3} className="d-none d-md-block">
          <SideBar />
        </Col>
        <Col md={9} lg={9} sm={12} xs={12} className='mb-5'>
          <h3 className='mb-3'>Edit Wisata</h3>
          <FormTourist />
        </Col>
      </Row>
      <BottomBar />
    </Container>
  )
}
