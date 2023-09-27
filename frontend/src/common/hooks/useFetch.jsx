import { useState } from "react";
import axios from "axios";
export default function useFetch() {
    // @ts-ignore
    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const [error, setError] = useState("");
    // @ts-ignore
    const [response, setResponse] = useState();
    // @ts-ignore
    const apiUrl = import.meta.env.VITE_API_URL;

    // @ts-ignore
    function get(endpoint, header, body) {}

    // @ts-ignore
    function post(endpoint, body, header) {
        setLoading(true);
        setError(undefined);
        if (header) {
            axios
                .post(`${apiUrl}${endpoint}`, body, { headers: header })
                // @ts-ignore
                .then((res) => {
                    setResponse(res.data);
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
                    setResponse(res.data);
                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e.message);
                    setError(e);
                    setLoading(false);
                });
        }
    }

    // @ts-ignore
    function put(endpoint, header, body) {}

    return { post, loading, error, response };
}
