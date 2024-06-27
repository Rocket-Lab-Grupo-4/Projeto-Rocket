"use client";

import { useState, useEffect } from 'react';
import styles from './searchBar.module.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    const [query, setQuery] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;

        setQuery(value);
        onSearch(value);
    }

    return (

        <div className={styles.searchBar}>

            <input
                type='text'
                placeholder='Digite aqui o nome de quem deseja encontrar'
                value={query}
                onChange={handleInputChange}
                className={styles.searchInput}>          
            </input>

        </div>
    );
};

export default SearchBar;