import React, {useState, useEffect, useRef} from 'react';
import Select from 'react-select';
import Api from "../../../helper/Api";

const ProductSelector = ({selectedCategory,selectedProduct, setSelectedProduct }) => {

    const [products, setProducts] = useState([]);
    // const [selectedProduct, setSelectedProduct] = useState(null);

    const selectInputRef = useRef();

    const api = new Api(); // Base URI is set in the constructor
    useEffect(() => {
        setSelectedProduct(null);
        setProducts([]);
        api.fetchData('/provider/product/'+selectedCategory)
            .then((data) => {
                console.log(data)
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
            });

    }, [selectedCategory]);


    const handleSelectProduct = (selectedOption) => {
        setSelectedProduct(selectedOption);
    };


    const categoryOptions = products.map((product) => ({
        value: product.product._id,
        label: product.product.name+"--"+product.product.brand+"--from "+product.providerName + "--price "+product.product.unit_price
    }));

    return (
        <Select
            ref={selectInputRef}
            className="select"
            options={categoryOptions}
            value={selectedProduct}
            onChange={handleSelectProduct}
            isSearchable
            placeholder="Search category..."
        />
    );
};

export default ProductSelector;
