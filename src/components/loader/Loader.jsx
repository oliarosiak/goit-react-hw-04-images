import { Vortex } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
    <div className={css.Loader}>
        <Vortex
            visible={true}
            height="200"
            width="200"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['#feac5e', '#c779d0', '#4bc0c8', '#ffa600', '#f16fb9', '#37c6ae']}
        />
    </div>
)

export default Loader;