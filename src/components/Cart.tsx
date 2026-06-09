
const Cart = ({cart, totalItems, changeQty, totalAmount}) => {
    return (
        <div className="CatalogueContainer">
            <div className="CatalogueHeader">
                <span>Cart</span>
                <span>{totalItems} items</span>
            </div>

            <div className="CartBody">
                {cart.map((c) => (
                    <div key={c.id} className="CartItemRow">
                        <span>{c.name}</span>
                        <span>{c.price}</span>
                        <span>
                            <button className="CartButton" onClick={() => changeQty(c.id, -1)}>
                                -
                            </button>
                            {c.qty}
                            <button className="CartButton" onClick={() => changeQty(c.id, +1)}>
                                +
                            </button>
                            <span className="CartAmount">{c.price * c.qty}</span>
                        </span>
                    </div>
                ))}

                <div className="Total">
                    <strong>Total = {totalAmount}</strong>
                </div>
            </div>
        </div>
    );
}

export default Cart;