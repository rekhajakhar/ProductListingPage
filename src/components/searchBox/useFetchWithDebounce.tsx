
//fetch custom hook with debounce
import {useState, useEffect} from "react";

const useFetchWithDebounce = <T,>(url: string, delay = 300) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        if(!url) {
            return;
        }
        setLoading(true);
        setError(null);
        const controller = new AbortController();

        const timeoutId = window.setTimeout( async () => {
            try{
                const response = await fetch(url, {signal: controller.signal});
                if(!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = (await response.json()) as T;
                if(!controller.signal.aborted) {
                    setData(result);
                }
            } catch(err) {
                if(!controller.signal.aborted) {
                    setError(err instanceof Error? err.message : "Something went wrong");
                }
            } finally {
                if(!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, delay);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        }
    }, [url, delay]);
    return {data, error, loading};
};

export default useFetchWithDebounce;