import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const getLoans = async () => (await axios.get(`${API_BASE}/loans`)).data;
export const createLoan = async (data) => (await axios.post(`${API_BASE}/loans`, data)).data;
export const assessCredit = async (data) => (await axios.post(`${API_BASE}/credit/assess`, data)).data;