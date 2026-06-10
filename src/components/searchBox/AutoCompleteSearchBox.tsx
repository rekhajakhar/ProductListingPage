
import {useState} from "react";
import useFetchWithDebounce from "./useFetchWithDebounce";

const AutoCompleteSearchBox = () => {
    const [search, setSearch] = useState("");
    const query = search.trim();
    const url = query ? 'https://example.com/api/search?q=${encodeURIComponent(query)}' : "";
    const {data, error, loading} = useFetchWithDebounce(url, 400);
    return (
        <div>
            <input 
            value={search} 
            placeholder="search..." 
            onChange={(e)=>setSearch(e.target.value)}/>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && (
                <ul>
                    {data.map( (item: any) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoCompleteSearchBox;