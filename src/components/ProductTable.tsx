
import { useState, useEffect, useMemo } from "react";
import {getProductDetails} from "../data/mockData.tsx";

const COLUMNS = [
    {id: 'name', display: 'Name'},
    {id: 'category', display: 'Category'},
    {id: 'price', display: 'Price'},
    {id: 'rating', display: 'Rating'},
    {id: 'inStock', display: 'InStock'},
];
const PAGESIZE = 5;
const ProductTable = () => {
    const [products, setProducts] = useState(getProductDetails());
    const [sortKey, setSortKey] = useState('name');
    const [sortDir, setSortDir] = useState('asc');
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect( () => {
        setProducts(getProductDetails());
    }, []);
    
    const handleColClick = (id) => {
        if(id === sortKey) {
            setSortDir( (prev) => prev === 'asc' ? 'desc' : 'asc');
        } else{
            setSortKey(id);
            setSortDir('asc');
        }
    };
    const filteredData = useMemo( () => {
        const q = search.toLowerCase().trim();
        if(!q) {
            return products;
        }
        return products.filter( (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }, [search, products]);

    const sortedData = useMemo ( () => {
        const dir = sortDir === 'asc' ? 1 : -1;

        return [...filteredData].sort( (a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];

            const result = typeof av === 'string' ? av.toLowerCase().localeCompare(bv.toLowerCase()) : av- bv;
            return result * dir;
        });
    }, [sortDir, sortKey]);
    const totalPages = Math.max(1, sortedData.length / PAGESIZE);
    const startIndex = page === 1 ? 0 : (page-1)*PAGESIZE;
    const paginatedData = sortedData.slice(startIndex, startIndex + PAGESIZE);
    console.log('totalPages:', totalPages);

    console.log('paginatedData:', paginatedData);
    return (
        <div>
            <div>
                <input placeholder="search by name or category"
                    className = "SearchBar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <table className ="table">
                <thead className="tableHeader">
                    <tr>
                        {COLUMNS.map( (c) => (
                        <th key={c.id}
                            onClick={() => handleColClick(c.id)}
                            style={{cursor: 'pointer'}}
                            >
                            {c.display}
                            {sortKey === c.id ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map( (p) => (
                        <tr key={p.id}>
                            <td>
                                {p.name}
                            </td>
                            <td>
                                {p.category}
                            </td>
                            <td>
                                {p.price}
                            </td>
                            <td>
                                {p.rating}
                            </td>
                            <td>
                                {p.inStock ? 'Yes' : 'No'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span className="paginationBar">
                Page {page} of {totalPages}
                <button className="paginationButton" onClick={ () => setPage( (prev) => prev-1 === 0 ? 0 : prev-1)}
                    disabled={page === 1}>
                    Prev
                </button>
                <button className="paginationButton" onClick={ () => setPage( (prev) => prev+1 > totalPages ? totalPages : prev+1)}
                    disabled={page === totalPages}>
                    Next
                </button>
            </span>
        </div>
    );
};

export default ProductTable;