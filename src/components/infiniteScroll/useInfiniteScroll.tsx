
import { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (fetchFn) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const sentinelRef = useRef(null);
    const isLoadingRef = useRef(false);

    const loadMore = useCallback( async (currentPage) => {
        if(isLoadingRef.current || !hasMore)
            return;
        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetchFn(currentPage);
            setData( (prev) => [...prev, ...response.items]);
            setPage( (prev) => prev+1);
            console.log("page", page);

            if(!response.hasNextPage || response.items.length === 0) {
                setHasMore(false);
            }
        } catch (err) {
            setError(err.message || "something went wrong");
        } finally {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }, [fetchFn, hasMore]);

    useEffect( () => {
        const observer = new IntersectionObserver( (entries) => {
            const first = entries[0];

            if(first.isIntersecting && hasMore && !isLoadingRef.current) {
                loadMore(page);
            }
        }, {
            threshold: 0.1
        });
        const sentinel = sentinelRef.current;
        if(sentinel)
            observer.observe(sentinel);

        return () => {
            if(sentinel)
                observer.unobserve(sentinel);
        }

    }, [hasMore, page, loadMore]);

    const retry = useCallback( () => {
        setError(null);
        loadMore(page);
    }, [loadMore, page]);

    return {data, page, error, isLoading, hasMore, retry, sentinelRef};
};

export default useInfiniteScroll;