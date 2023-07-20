import './Header.css';
import { ReactComponent as NotificationIco } from '../../../assets/icons/bellIco-light.svg';

function Header(){
    return(
        <header className="header">
            <h1>Dashboard</h1>
            <div className="stack" >
                <div className="notification">
                    <NotificationIco/>
                </div>
                <div className="user">
                    <div>

                    </div>
                </div>
            </div>
        </header>
    );
}


export default Header;
