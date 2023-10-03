import { useState } from "react";
import axios from "axios";
export default function useFetch() {
    // @ts-ignore
    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const [error, setError] = useState("");
    // @ts-ignore
    const [response, setResponse] = useState(0);
    // @ts-ignore
    const apiUrl = import.meta.env.VITE_API_URL;

    // @ts-ignore
    function get(endpoint, header) {
        setLoading(true);
        setError(undefined);
        if (header) {
            axios
                .get(`${apiUrl}${endpoint}`, { headers: header })
                .then((res) => {
                    setResponse(res.status);
                    setLoading(false);
                })
                .catch((e) => {
                    setLoading(false);
                    setError("Something went wrong collecting the response");
                });
        }
    }

    // @ts-ignore
    function post(endpoint, body, header) {
        setLoading(true);
        setError(undefined);
        if (header) {
            axios
                .post(`${apiUrl}${endpoint}`, body, { headers: header })
                // @ts-ignore
                .then((res) => {
                    setResponse(res.status);
                    setLoading(false);
                })
                .catch((e) => {
                    setError(e);
                    setLoading(false);
                });
        } else {
            axios
                .post(`${apiUrl}${endpoint}`, body)
                // @ts-ignore
                .then((res) => {
                    setResponse(res.status);
                    setLoading(false);
                })
                .catch((e) => {
                    setError("DOH! Something went wrong");
                    setLoading(false);
                });
        }
    }

    // @ts-ignore
    function put(endpoint, body, header) {
        setLoading(true);
        setError(undefined);
        if (header) {
            axios
                .put(`${apiUrl}${endpoint}`, body, { headers: header })
                // @ts-ignore
                .then((res) => {
                    setResponse(res.status);
                    setLoading(false);
                })
                .catch((e) => {
                    setError(e);
                    setLoading(false);
                });
        } else {
            axios
                .put(`${apiUrl}${endpoint}`, body)
                // @ts-ignore
                .then((res) => {
                    setResponse(res.status);
                    setLoading(false);
                })
                .catch((e) => {
                    setError(e.response.data);
                    setLoading(false);
                });
        }
    }

    return { post, put, loading, error, response };
}
