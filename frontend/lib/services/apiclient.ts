// 'use client';
import axios from "axios";

// client component 
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000, 
  timeoutErrorMessage: "Server timed out...",
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

// interceptor 

axiosClient.interceptors.response.use((response) => response.data )

export default axiosClient