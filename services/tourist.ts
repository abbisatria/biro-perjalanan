import { payloadPostTourist } from "@/types/tourist.type";
import http from "@/utils/http";

export const getTourist = async (page: number) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await http.get(`Tourist?page=${page}`);
            if (response.data) resolve(response.data);
        } catch (err: any) {
            reject();
        }
    });

export const getDetailTourist = async (id: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await http.get(`Tourist/${id}`);
            if (response.data) resolve(response.data);
        } catch (err: any) {
            reject();
        }
    });

export const deleteTourist = async (id: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await http.delete(`Tourist/${id}`);
            if (response.data) resolve(response.data);
        } catch (err: any) {
            reject();
        }
    });

export const postTourist = async (data: payloadPostTourist) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await http.post(`Tourist`, data);
            if (response.data) resolve(response.data);
        } catch (err: any) {
            reject();
        }
    });

export const putTourist = async (data: payloadPostTourist, id: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await http.put(`Tourist/${id}`, data);
            if (response.data) resolve(response.data);
        } catch (err: any) {
            reject();
        }
    });