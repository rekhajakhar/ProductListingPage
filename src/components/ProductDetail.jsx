
const ProductDetail = ({name, price, rating, category, inStock}) => {
    return(
        <div className="ProductCard">
            <h1>{name}</h1>
            <p>Price: ${price}</p>
            <p>Rating: {rating} / 5</p>
            <p>Category: {category}</p>
            <p>{inStock ? "In Stock" : "Out of Stock"}</p>
        </div>
    );
};

export default ProductDetail;