import { useState, useEffect } from "react";
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


const App = () => {  
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalDescription, setModalDescription] = useState({});  

  const searchbarHandler = query => {
    setSearchQuery(query);
    setPageNumber(1);
    setImages([]);
    setTotalHits(null); 
  }


  const buttonHandler = () => {
    setPageNumber(pageNumber + 1);
  }

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  }

  const imageClickHandler = (src, alt) => {
    const description = {
      src,
      alt
    };
    setModalDescription(description);
    toggleModal();  
  }

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    fetchPixabayRequest(searchQuery, pageNumber).then(data => {
      setIsLoading(false);
      setTotalHits(data.totalHits);
      if (data.hits.length === 0) {
        return toast.error(`There are no matches for the request ${searchQuery}! Try another query!`);
      }        
      setImages(prevState => [...prevState, ...data.hits]);
    })
  }, [searchQuery, pageNumber]);

  const loadMoreBtn = totalHits > 12 && pageNumber < Math.ceil(totalHits / 12);

  return (
    <div className={css.App}>
      <ToastContainer autoClose={1500} closeOnClick />
      <Searchbar onSubmit={searchbarHandler} />
      {isLoading && <Loader />}
      <ImageGallery>
        <ImageGalleryItem arrayOfImages={images} onImageClick={imageClickHandler} />
      </ImageGallery>
      {showModal && <Modal onCloseModal={toggleModal} imageData={modalDescription} />}
      {loadMoreBtn && <Button onButtonClick={buttonHandler} />}
    </div>
  );
}

export default App;