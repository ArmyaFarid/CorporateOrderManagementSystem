import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIco } from '../../../assets/icons/homeIco.svg';
import { ReactComponent as HistoryIco } from '../../../assets/icons/historyIco.svg';
import { ReactComponent as InvoiceIco } from '../../../assets/icons/usd-squareIco.svg';
import { ReactComponent as OrderIco } from '../../../assets/icons/bookmarkIco.svg';
import { ReactComponent as NotificationIco } from '../../../assets/icons/bellIco.svg';
import { ReactComponent as SettingsIco } from '../../../assets/icons/settingsIco.svg';
import { ReactComponent as LogoutIco } from '../../../assets/icons/signoutIco.svg';
import adminImg from '../../../assets/img/faridbakouan.jpg';
function Sidebar(){
    const location = useLocation();

    return (
        <nav className="sidebar">
            <div className="nav-container">
                <div className="app-title">
                    My super app
                </div>
                <div className="profile">
                    <div className="imagebox">
                        <img src={adminImg} className="profile-pic" alt=""/>
                    </div>
                    <div className="info">
                        <h5>Farid
                            BAKOUAN</h5>
                        <span>Admin</span>
                    </div>
                </div>
                <ul className="nav main-nav">
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'nav-active' : ''}>
                            <div className="nav-icon">
                                <HomeIco/>
                                <span className="nav-text">Home</span>
                            </div>
                        </Link>
                    </li>

                    <li className={location.pathname === '/historique' ? 'nav-active' : ''}>
                        <Link to="historique" >
                            <div className="nav-icon">
                                <HistoryIco/>
                                <span className="nav-text">Historique</span>
                            </div>
                        </Link>
                    </li>

                    <li className={location.pathname === '/nos-commandes' ? 'nav-active' : ''}>
                        <Link to="nos-commandes" >
                            <div className="nav-icon">
                                <OrderIco/>
                                <span className="nav-text">Nos commandes</span>
                            </div>
                        </Link>
                    </li>

                    <li className={location.pathname === '/paiement' ? 'nav-active' : ''}>
                        <Link to="paiement" >
                            <div className="nav-icon">
                                <InvoiceIco/>
                                <span className="nav-text">Payement</span>
                            </div>
                        </Link>
                    </li>

                    <li className={location.pathname === '/notification' ? 'nav-active' : ''}>
                        <Link to="notification" >
                            <div className="nav-icon">
                                <NotificationIco/>
                                <span className="nav-text">Notification</span>
                            </div>
                        </Link>
                    </li>


                    <li className={location.pathname === '/parametres' ? 'nav-active' : ''}>
                        <Link to="parametres" >
                            <div className="nav-icon">
                                <SettingsIco/>
                                <span className="nav-text">Parametres</span>
                            </div>
                        </Link>
                    </li>

                </ul>

                <ul className="nav logout-nav">
                    <li className={location.pathname === '/logout' ? 'nav-active' : ''}>
                        <Link to="logout" >
                            <div className="nav-icon">
                                <span className="nav-text">Se deconnecter</span>
                                <LogoutIco/>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;