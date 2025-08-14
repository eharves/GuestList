import { useState, useEffect } from "react"

export default function GetDataHooks(url) {
    const[data, setData] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        setLoading(true);

        async function getData() {
        try {
           const res = await fetch(url);
           const json = await res.json();
           setData(json.data); 
        } catch (error) {
           setError(error); 
        } finally {
            setLoading(false);
        }   
    }

    getData();
    }, [url]);

    return { data, loading, error };
}