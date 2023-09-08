import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Link from 'next/link';
import { postRegister } from '@/services/auth';
import { responseType } from '@/types/tourist.type';
import { payloadRegister } from '@/types/auth.type';

export default function Register() {
    const router = useRouter();

    const [data, setData] = useState<payloadRegister>({
        email: '',
        password: '',
        name: ''
    })

    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setLoading(true)
            const response = await postRegister(data) as responseType
            setLoading(false)
            if (response?.error) {
                const message = Array.isArray(response?.message) ? response?.message[0] : response?.message
                toast(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast('Anda Berhasil Registrasi', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                router.push('/')
            }
        } catch (err) {
            toast('Ada Kesalahan Pada Saat Request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
        }
    }
    return (
        <Container fluid>
            <Row>
                <Col md={6} className="p-5">
                    <div className='d-flex h-100 flex-column justify-content-center'>
                        <h3>Register</h3>
                        <p>Registrasi untuk temukan perjalananmu di <b>Biro Perjalanan</b></p>
                        <Form onSubmit={onSubmit}>
                            <FormGroup className="my-3">
                                <Form.Label className="mb-2">Nama Lengkap</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    className="rounded-pill"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="my-3">
                                <Form.Label className="mb-2">Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Masukkan email address"
                                    className="rounded-pill"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Label className="mb-2">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Masukkan password"
                                    className="rounded-pill"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            </FormGroup>
                            <h6 className="mb-5">Apakah sudah punya akun? <Link className='text-primary pointer' href="/">Login</Link></h6>
                            {loading
                                ? (
                                    <div className="d-flex justify-content-center">
                                        <Spinner color="dark" />
                                    </div>
                                )
                                : (
                                    <Button color="primary" className="w-100 rounded-pill" type='submit' disabled={!data.email || !data.name || !data.password}>Register</Button>
                                )}
                        </Form>
                    </div>
                </Col>
                <Col md={6} className="bg-login d-none d-md-block">
                    <div className='d-flex h-100 flex-column justify-content-center'>
                        <h6 className="title text-center">Temukan Perjalananmu Sekarang.</h6>
                        <p className="text-center">Kami siap melayani anda dengan sepenuh hati</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/dashboard/app",
                permanent: false,
            },
        };
    }
    return { props: {} };
}
