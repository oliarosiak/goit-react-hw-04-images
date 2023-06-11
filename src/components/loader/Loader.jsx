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
            colors={['#6f6a84', '#605572', '#52405f', '#452c4c', '#391838', '#2c0225']}
        />
    </div>
)

export default Loader;