import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import { deleteTourist, getTourist } from '@/services/tourist'
import { dataTourist, pageInfo, responseTouristType, responseType } from '@/types/tourist.type'
import Image from 'next/image'
import SideBar from '@/components/SideBar'
import BottomBar from '@/components/BottomBar'
import Pagination from 'react-js-pagination'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function App() {

    const { push } = useRouter();

    const [page, setPage] = useState<number>(1)
    const [data, setData] = useState<dataTourist[]>([])
    const [pageInfo, setPageInfo] = useState<pageInfo>({
        total_pages: 0,
        totalrecord: 0
    })
    const [loading, setLoading] = useState<boolean>(false)

    const fetchTourist = useCallback(async () => {
        setLoading(true)
        const responTourist = await getTourist(page) as responseTouristType
        setLoading(false)
        if (responTourist?.data?.length > 0) {
            setData(responTourist?.data)
            setPageInfo({
                total_pages: responTourist?.total_pages,
                totalrecord: responTourist?.totalrecord
            })
        } else {
            setData([])
            setPageInfo({
                total_pages: 0,
                totalrecord: 0
            })
        }
    }, [page])

    useEffect(() => {
        fetchTourist()
    }, [fetchTourist])

    const handleChangePage = (page: number) => {
        setPage(page)
    }

    const deleteData = async (id: string) => {
        try {
            setLoading(true)
            const responDelete = await deleteTourist(id) as responseType
            setLoading(false)
            if (responDelete?.error) {
                const message = Array.isArray(responDelete?.message) ? responDelete?.message[0] : responDelete?.message
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
                toast('Data Berhasil Dihapus', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                fetchTourist()
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
        <Container fluid className="p-4">
            <Row>
                <Col md={3} className="d-none d-md-block">
                    <SideBar />
                </Col>
                <Col md={9} lg={9} sm={12} xs={12} className='mb-5'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h3>List Daftar Wisata</h3>
                        <Button type='button' onClick={() => push('/dashboard/tourist/create')}>Tambah Wisata</Button>
                    </div>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Wisata</th>
                                <th>Lokasi Wisata</th>
                                <th>Email Wisata</th>
                                <th>Gambar Wisata</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className='text-center'>
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                data.length > 0 && data.map((val, idx: number) => {
                                    return (
                                        <tr key={String(idx)}>
                                            <td>{((page - 1) * 10) + (idx + 1)}</td>
                                            <td>{val.tourist_name}</td>
                                            <td>{val.tourist_location}</td>
                                            <td>{val.tourist_email}</td>
                                            <td><Image src={val.tourist_profilepicture} alt={val.tourist_name} width={50} height={50} /></td>
                                            <td>
                                                <Button variant='primary' className='me-2' onClick={() => push(`/dashboard/tourist/edit/${val.id}`)}><i className='fa fa-pencil' /></Button>
                                                <Button variant='danger' type='button' onClick={() => deleteData(val.id)}><i className='fa fa-trash' /></Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className='text-center'>
                                        Data Kosong
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {pageInfo.totalrecord > 0 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={10}
                                totalItemsCount={pageInfo.totalrecord}
                                pageRangeDisplayed={5}
                                onChange={handleChangePage.bind(null)}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </Col>
            </Row>
            <BottomBar />
        </Container>
    )
}
