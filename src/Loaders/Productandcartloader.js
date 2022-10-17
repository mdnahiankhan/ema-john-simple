import { getSotredCart } from "../utilities/fakedb";

export const productsandcartLoader = async () => {
    // get product
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    // get cart
    const savecart = getSotredCart();
    const initialcart = [];
    for (const id in savecart) {
        const addedproduct = products.find(product => product.id === id);
        if (addedproduct) {
            const quantity = savecart[id];
            addedproduct.quantity = quantity;
            initialcart.push(addedproduct);
        }
    }

    return { products: products, initialcart: initialcart };
}