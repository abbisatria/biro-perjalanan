import { getDetailTourist, postTourist, putTourist } from '@/services/tourist'
import { dataTourist, payloadPostTourist, responseType } from '@/types/tourist.type'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function FormTourist() {
    const { push, query } = useRouter()

    const [data, setData] = useState<payloadPostTourist>({
        tourist_email: '',
        tourist_location: '',
        tourist_name: '',
    })

    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setLoading(true)
            let response
            if (query.id) {
                response = await putTourist(data, query.id as string) as responseType
            } else {
                response = await postTourist(data) as responseType
            }
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
                toast(query.id ? 'Data Wisata Berhasil Diupdate' : 'Data Wisata Berhasil Ditambahkan', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                push('/dashboard/app')
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

    const fetchDetailTourist = useCallback(async () => {
        const response = await getDetailTourist(query.id as string) as dataTourist
        if (response?.id) {
            setData(response)
        } else {
            toast('Data Wisata Tidak ditemukan', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            push('/dashboard/app')
        }
    }, [push, query.id])

    useEffect(() => {
        if (query.id) {
            fetchDetailTourist()
        }
    }, [fetchDetailTourist, query.id])

    return (
        <Form onSubmit={onSubmit}>
            <FormGroup className="my-3">
                <Form.Label className="mb-2">Nama Wisata</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Masukkan nama wisata"
                    className="rounded-pill"
                    value={data.tourist_name}
                    onChange={(e) => setData({ ...data, tourist_name: e.target.value })}
                />
            </FormGroup>
            <FormGroup className="my-3">
                <Form.Label className="mb-2">Lokasi Wisata</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Masukkan lokasi wisata"
                    className="rounded-pill"
                    value={data.tourist_location}
                    onChange={(e) => setData({ ...data, tourist_location: e.target.value })}
                />
            </FormGroup>
            <FormGroup className="my-3">
                <Form.Label className="mb-2">Email Wisata</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Masukkan email wisata"
                    className="rounded-pill"
                    value={data.tourist_email}
                    onChange={(e) => setData({ ...data, tourist_email: e.target.value })}
                />
            </FormGroup>
            {loading
                ? (
                    <div className="d-flex justify-content-center">
                        <Spinner color="dark" />
                    </div>
                )
                : (
                    <Button color="primary" className="w-100 rounded-pill" type='submit' disabled={!data.tourist_email || !data.tourist_location || !data.tourist_name}>{query.id ? 'Edit Wisata' : 'Tambah Wisata'}</Button>
                )}
        </Form>
    )
}
