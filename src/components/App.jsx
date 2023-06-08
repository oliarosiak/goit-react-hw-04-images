import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

import { fetchPixabayRequest } from '../api/fetchPixabayRequest';
import Searchbar from "./searchbar/Searchbar";
import Loader from "./loader/Loader";
import ImageGallery from "./imageGallery/ImageGallery";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import Modal from "./modal/Modal";
import Button from "./button/Button";

class App extends Component{
  state = {
    searchQuery: '',
    images: [],
    pageNumber: 1,
    totalHits: null,
    isLoading: false,
    showModal: false,
    modalDescription: {},
  }

  componentDidUpdate(_, prevState) {
    const { searchQuery, pageNumber } = this.state; 
    
    if (searchQuery !== prevState.searchQuery || pageNumber !== prevState.pageNumber) {
      this.setState({ isLoading: true });    
      
      fetchPixabayRequest(searchQuery, pageNumber).then(data => {
      
        this.setState({ isLoading: false });
        this.setState({ totalHits: data.totalHits });

        if (data.hits.length === 0) {          
          return toast.error(`There are no matches for the request ${searchQuery}! Try another query!`);
        }
        
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
          }
        });
      });
    }
  }

  searchbarHandler = searchQuery => {
    this.setState({ searchQuery, pageNumber: 1, images: [], totalHits: null }); 
  }
  
  buttonHandler = () => {   
    this.setState(prevState => {
      return {
        pageNumber: prevState.pageNumber + 1,
      }
    })
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }

  imageClickHandler = (src, alt) => {
    const description = {
      src,
      alt
    };
    this.setState({ modalDescription: { ...description } });
    this.toggleModal();  
  }

  render() {
    const { images, pageNumber, totalHits, isLoading, showModal, modalDescription } = this.state;
    const loadMoreBtn = totalHits > 12 && pageNumber < Math.ceil(totalHits / 12);

    return (
      <div className={css.App}>
        <ToastContainer autoClose={2000} closeOnClick />
        <Searchbar onSubmit={this.searchbarHandler} />
        {isLoading && <Loader />}
        <ImageGallery>
          <ImageGalleryItem arrayOfImages={images} onImageClick={this.imageClickHandler} />
        </ImageGallery>
        {showModal && <Modal onCloseModal={this.toggleModal} imageData={modalDescription} />}
        {loadMoreBtn && <Button onButtonClick={this.buttonHandler} />}
      </div>
    )
  }
}

export default App;