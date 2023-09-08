import BottomBar from '@/components/BottomBar'
import SideBar from '@/components/SideBar'
import { useSession } from 'next-auth/react';
import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

export default function Profile() {
    const { data } = useSession();
    return (
        <Container fluid className="p-4">
            <Row>
                <Col md={3} className="d-none d-md-block">
                    <SideBar />
                </Col>
                <Col md={9} lg={9} sm={12} xs={12} className='mb-5'>
                    <h3 className='mb-3'>Profile</h3>
                    <div className='d-flex align-items-center'>
                        <div className='card-icon'><i className='fa fa-user' /></div>
                        <Form.Label className='mb-0'>Nama Lengkap : <span>{data?.user?.name}</span></Form.Label>
                    </div>
                    <hr />
                    <div className='d-flex align-items-center'>
                        <div className='card-icon'><i className='fa fa-envelope' /></div>
                        <Form.Label className='mb-0'>Email : <span>{data?.user?.email}</span></Form.Label>
                    </div>
                    <hr />
                </Col>
            </Row>
            <BottomBar />
        </Container>
    )
}
