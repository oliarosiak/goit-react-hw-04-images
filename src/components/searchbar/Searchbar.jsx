import React, { Component } from "react";
import { toast } from 'react-toastify';
import { BsSearchHeartFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        searchQuery: '',
    }

    inputHeandler = event => {
        const searchQuery = event.currentTarget.value.toLowerCase();
        this.setState({ searchQuery });   
    }

    submitHeandler = event => {
        event.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            return toast('Wow, wow! Hold on! Enter the request');
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });      
    }

    render() {        
        return (
            <header className={css.Searchbar}>
                <form onSubmit={this.submitHeandler} className={css.SearchForm}>
                    <button type="submit" className={css.SearchFormButton}>
                        <BsSearchHeartFill className={css.SearchFormButtonLabel} /> 
                    </button>

                    <input
                        name="search"
                        value={this.state.searchQuery}
                        onChange={this.inputHeandler}
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {   
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;       