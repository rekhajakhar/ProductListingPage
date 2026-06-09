import ProductDetail from "./ProductDetail";
import { useState, useEffect } from "react";
import { getProductDetails } from "../data/mockData.tsx";


const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('default');

    useEffect( () => {
        setProducts(getProductDetails());
    }, []);
    const categories = ['All', ...new Set(products.map( (p) => p.category))];
    const filteredList = products.filter( (p) => p.name.toLowerCase().includes(search.toLowerCase()))
                                .filter( (p) => p.category === category || category === 'All')
                                .sort( (a, b) => {
                                        if(sort === 'price-asc') {
                                            return a.price - b.price;
                                        }
                                        if(sort === 'price-desc') {
                                            return b.price - a.price;
                                        }
                                        if(sort === 'rating') {
                                            return b.rating - a.rating;
                                        }
                                        return 0;
                                });
    return (
        <div>
            <div className="HeroSection">
                <div className="SearchBar">
                    <input type="text"
                        placeholder="Search for products..."
                        value={search}
                        onChange={ (e) => setSearch(e.target.value) }
                    />
                </div>
                <select value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map( (c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>))}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="default">
                            Default
                        </option>
                        <option value="price-asc">
                            Price: Low to High
                        </option>
                        <option value="price-desc">
                            Price: High to Low
                        </option>
                        <option value="rating">
                            Rating
                        </option>
                </select>
            </div>
            <div className="ProductListing">
                {filteredList && filteredList.map( (product) => (
                    <ProductDetail key={product.id} name={product.name} price={product.price} rating={product.rating} category={product.category} inStock={product.inStock} />
                ))}
            </div>
        </div>
    );
};

export default ProductListing;