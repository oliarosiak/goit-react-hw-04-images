import { useState } from "react";
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({onSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const inputHeandler = event => setSearchQuery(event.currentTarget.value.toLowerCase());

    const submitHeandler = event => {
        event.preventDefault();
        if (searchQuery.trim() === '') {
            return toast('Wow, wow! Hold on! Enter the request');
        }
        onSubmit(searchQuery);
        setSearchQuery('');
    }
    
    return (
        <header className={css.Searchbar}>
            <form onSubmit={submitHeandler} className={css.SearchForm}>
                <button type="submit" className={css.SearchFormButton}>
                    <BsSearch fill="#fff" className={css.SearchFormButtonLabel} />
                </button>

                <input
                    name="search"
                    value={searchQuery}
                    onChange={inputHeandler}
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );

}

Searchbar.propTypes = {   
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;       