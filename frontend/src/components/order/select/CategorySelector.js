import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Api from "../../../helper/Api";

const CategorySelector = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const api = new Api(); // Base URI is set in the constructor


    useEffect(() => {

        api.fetchData('/provider/all-categories')
            .then((data) => {
                console.log(data)
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
            });

    }, []);






    const handleSelectCategory = (selectedOption) => {
        onSelectCategory(null);
        setSelectedCategory(selectedOption);
        onSelectCategory(selectedOption.value); // Pass the selected client ID to the parent component
    };


    const categoryOptions = categories.map((categroy) => ({
        value: categroy,
        label: categroy,
    }));

    return (
        <Select
            className="select"
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleSelectCategory}
            isSearchable
            placeholder="Search category..."
        />
    );
};

export default CategorySelector;
