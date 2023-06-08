import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component{

    componentDidMount() {       
        window.addEventListener('keydown', this.escKeyHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.escKeyHandler);
    }

    escKeyHandler = event => {
        if (event.code === 'Escape') {            
            this.props.onCloseModal();
        }
    }

    overlayClickHandler = event => {
        if (event.currentTarget === event.target) {
            this.props.onCloseModal();
        }
    }

    render() {        
        const { imageData } = this.props;    
        const { src, alt } = imageData;

        return createPortal(
            <div onClick={this.overlayClickHandler} className={css.Overlay} >
                <div className={css.Modal} >
                    <img src={src} alt={alt} />
                </div>
            </div>, modalRoot,            
        )
    }
}

Modal.propTypes = {
    imageData: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

export default Modal;