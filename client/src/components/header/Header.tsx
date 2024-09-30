import Divider from '../divider/Divider';
import './Header.scss';

function Header() {
    return (
        <div className="header">
            <h1 className="header__heading">Synonym Search Tool</h1>
            <Divider />
        </div>
    );
}

export default Header;
