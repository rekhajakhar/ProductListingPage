
//main container to show posts, error, all caught up, & call the custom hook to fetch the next page on scroll
import { fetchPosts } from "./mockDataInfiniteScroll";
import useInfiniteScroll from "./useInfiniteScroll";
import PostCard from "./PostCard";

const InfiniteList = () => {
    const {data, page, error, isLoading, hasMore, retry, sentinelRef} = useInfiniteScroll(fetchPosts);
    console.log("page container", page);
    return(
        <div>
            <div className="list-container">
                {data.map( (item) => (
                    <PostCard key ={item.id} item={item}/>
                ))}

                {hasMore && (
                <div
                ref={sentinelRef}
                style={{height: 1}}
                aria-hidden = "true"/>
            )}
            </div>

            
        </div>
    );
};

export default InfiniteList;