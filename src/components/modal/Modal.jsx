import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({onCloseModal, imageData}) => {    
    const overlayClickHandler = event => {
        if (event.currentTarget === event.target) {
            onCloseModal();
        }
    }
    
    useEffect(() => {
        const escKeyHandler = event => {
            if (event.code === 'Escape') {
                onCloseModal();
            }
        };
        
        window.addEventListener('keydown', escKeyHandler);
        return () => {            
            window.removeEventListener('keydown', escKeyHandler);
        };
    }, [onCloseModal]);

    return createPortal(
        <div onClick={overlayClickHandler} className={css.Overlay} >
            <div className={css.Modal} >
                <img src={imageData.src} alt={imageData.alt} />
            </div>
        </div>, modalRoot,
    );
}

Modal.propTypes = {
    imageData: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

export default Modal;