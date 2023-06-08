import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ arrayOfImages, onImageClick }) => (
    <>
        {arrayOfImages.map(({ id, webformatURL, largeImageURL, tags }) => {
            return <li key={id} className={css.ImageGalleryItem}>
                <img src={webformatURL} alt={tags}
                    className={css.ImageGalleryItemImage} onClick={() => onImageClick(largeImageURL, tags)} />
            </li>
        })}
    </>
);

ImageGalleryItem.propTypes = {
    arrayOfImages: PropTypes.array.isRequired,
    onImageClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;