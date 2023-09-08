import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Link from 'next/link';

interface signInType {
  error: string;
  ok: boolean;
  status: number;
  url: string;
}

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    }) as signInType;
    if (res.ok) {
      setLoading(false)
      router.push(router.query?.callbackUrl as string || '/dashboard/app');
    } else {
      setLoading(false)
      toast('Email atau Password yang anda masukan salah', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col md={6} className="p-5">
          <div className='d-flex h-100 flex-column justify-content-center'>
            <h3>Sign In</h3>
            <p>Masuk untuk temukan perjalananmu di <b>Biro Perjalanan</b></p>
            <Form onSubmit={onSubmit}>
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
              <h6 className="mb-5">Apakah anda belum punya akun? <Link className='text-primary pointer' href="/register">Register</Link></h6>
              {loading
                ? (
                  <div className="d-flex justify-content-center">
                    <Spinner color="dark" />
                  </div>
                )
                : (
                  <Button color="primary" className="w-100 rounded-pill" type='submit'>Continue to Sign In</Button>
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
