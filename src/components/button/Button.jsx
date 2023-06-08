import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onButtonClick }) => (
    <button
        onClick={() => onButtonClick()}
        type="button"
        className={css.Button} >
        Load more
    </button>
);

Button.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
}

export default Button;