

const Catalogue = ({products, cart, addToCart}) => {
    
    return (
        <div className="CatalogueContainer">
            <div className="CatalogueHeader"> 
                <span>Catalogue</span>
                <span> {products.length}</span>
            </div>
            {products.map( (p) => {
                const inCart = cart.find( (c) => c.id === p.id);
                const qty = inCart ? cart.find( (c) => c.id === p.id).qty : 0;
                
                return (
                <div key={p.id}
                className="productRow">
                    {p.name}
                    {p.price}
                    <span>
                        <button onClick={ () => addToCart(p)}>
                            {inCart ? `In cart (${qty})` : 'Add +'}
                        </button>
                    </span>
                </div>
                )
            })}
        </div>
    );
};

export default Catalogue;