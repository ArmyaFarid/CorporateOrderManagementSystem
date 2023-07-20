import React,  {useState }  from "react";
import formatPrice from "../../../../helper/formatter";

import CategorySelector from "../../select/CategorySelector";
import ProductSelector from "../../select/ProductSelector";
import Api from "../../../../helper/Api";

function CreateOrder({hideForm,handeReloadOrders}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);



    const Swal = require('sweetalert2')


    const handleSelCategory = (categoryName) => {
        setSelectedCategory(categoryName);
    };



    const cancelCreate = () => {
        hideForm();
    }

    const api = new Api(); // Base URI is set in the constructor

    const postData = (formData) => {

        api.postData('/order/',formData)
            .then( (response) => {
                if(response.message==="Post saved successfully!"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Commande ajouté !',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    handeReloadOrders()
                    cancelCreate()
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Erreur lors de la commande",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((error) => {
            console.error('NetworkError:', error);
        });
    };



    function extractProviderName(text) {
        // Find the index of "from" in the text (case-insensitive)
        const fromIndex = text.toLowerCase().indexOf('from');

        // If "from" is found and there is text after it, extract the provider name
        if (fromIndex !== -1 && fromIndex + 5 < text.length) {
            const providerStartIndex = fromIndex + 5; // Skip the length of "from" and a space
            const providerEndIndex = text.indexOf('--', providerStartIndex); // Find the end index of the provider name
            if (providerEndIndex !== -1) {
                return text.slice(providerStartIndex, providerEndIndex).trim();
            }
        }

        return null; // Return null if "from" or provider name is not found
    }

    function extractPrice(text) {

        // Find the index of the word "from" in the text (case-insensitive)
        const fromIndex = text.toLowerCase().indexOf('price');

        // If "from" is found, return the text after it, else return null
        return fromIndex !== -1 ? parseFloat(text.slice(fromIndex + 5).trim()) : null;

    }

    const handleChange = (e) => {
        const value = e.target.value;
        if(e.target.name==="qte"){
            setQuantity(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedProduct){
            const formData ={
                productId: selectedProduct.value,
                quantity:quantity
            }

            postData(formData);
        }else{
            console.log("Form is empty");
            alert("Remplir tout le formulaire");
        }

    };

    return (
                    <form  onSubmit={handleSubmit} className="order-form">
                        <div className="heading">
                                Ajouter une commande
                        </div>

                        <div className="form-content">
                            <div className="input-container">
                                <label htmlFor="category-selector" className="placeholder">Categorie</label>
                                <CategorySelector  onSelectCategory={handleSelCategory} />
                            </div>

                            <div className="input-container">
                                <label htmlFor="product-selector" className="placeholder">Produit</label>
                                <ProductSelector selectedCategory={selectedCategory}  selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
                            </div>

                            <div className="input-container">
                                <label htmlFor="provider-show" className="placeholder">Fournisseur</label>
                                <br/>
                                <button disabled className="input-box">
                                    {selectedProduct ? extractProviderName(selectedProduct.label) : "Choisir d'abord"}
                                </button>
                            </div>

                            <div className="input-container input-row-container">
                                <div className="price">
                                    <label htmlFor="provider-show" className="placeholder">Unit price</label>
                                    <br/>
                                    <button className="input-box-min" disabled>
                                        {selectedProduct ? formatPrice(extractPrice(selectedProduct.label)) : "Choisir d'abord"}
                                    </button>
                                </div>

                                <div className="qte">
                                    <label htmlFor="provider-show" className="placeholder">Quantite</label>
                                    <br/>
                                    <input type="number" value={quantity} onChange={handleChange} name="qte" className="input-box-min"/>
                                </div>

                                <div className="total">
                                    <label htmlFor="provider-show" className="placeholder">Total</label>
                                    <br/>
                                    <button className="input-box-min" disabled>
                                        {selectedProduct ? formatPrice(extractPrice(selectedProduct.label)*parseFloat(quantity)) : "Choisir d'abord"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="buttons-container">
                            <button type="text" className="btn-annuler" onClick={cancelCreate} >Annuler</button>
                            <button type="submit" className="btn-submit" disabled={selectedProduct==null}>Valider</button>
                        </div>

                    </form>
    )

}

export default CreateOrder