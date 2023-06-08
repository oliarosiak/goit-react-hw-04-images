import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ children }) => (
    <ul className={css.ImageGallery}>
        {children}
    </ul>
);

ImageGallery.propTypes = {
    children: PropTypes.object.isRequired,
}

export default ImageGallery;