import './DashboardLayout.css'
import {
    Outlet
} from 'react-router-dom';
import Sidebar from "./nav/Sidebar";
import Header from "./header/Header";
function DashboardLayout() {
    return (
        <div className="dashboard-container">
            <Sidebar/>
            <Header/>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;