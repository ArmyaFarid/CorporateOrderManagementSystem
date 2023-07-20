import {useEffect, useRef, useState} from "react";
import ResumeBoardHead from "./ResumeBoardHead";
import Api from "../../helper/Api";
import { ReactComponent as OrderIco } from '../../assets/icons/bookmarkIco-big.svg';
import { ReactComponent as DeliveredIco } from '../../assets/icons/done-circleIco-big.svg';
import { ReactComponent as CostIco } from '../../assets/icons/usd-squareIco-big.svg';
import { ReactComponent as ProviderIco } from '../../assets/icons/userIco-big.svg';
import formatPrice from "../../helper/formatter";

function ResumeBoard() {

    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [searchString, setSearchString] = useState('');
    const [stat, setStat] = useState(null);


    const handleResize = () => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    };


    const api = new Api(); // Base URI is set in the constructor


    useEffect(() => {

        api.fetchData('/statistics')
            .then((data) => {
                console.log(data)
                setStat(data);
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });

        // Initial measurement on component mount
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="page-wrapper"  ref={refContainer}>
            <ResumeBoardHead parentWidth={dimensions.width} searchString={searchString} setSearchString={setSearchString}/>
            <div className="component-body">
                <div className="card-container resume-card-container">
                    <div className="card">
                        <div className="card-head">
                            <div className="illustration">
                                <OrderIco/>
                            </div>
                            <h4>Commandes</h4>
                        </div>
                        <div className="card-data">
                            <h3>{stat? stat.numOrders : "---"}</h3>
                        </div>
                    </div>

                    <div className="card" style={{backgroundColor: "#FEF6FB"}}>
                        <div className="card-head">
                            <div className="illustration">
                                <DeliveredIco/>

                            </div>
                            <h4>Livré</h4>
                        </div>
                        <div className="card-data">
                            <h3>{stat? stat.numDeliveredOrders : "---"}</h3>
                        </div>
                    </div>


                    <div className="card" style={{backgroundColor: "#FEFBEC"}}>
                        <div className="card-head">
                            <div className="illustration">
                                <CostIco/>

                            </div>
                            <h4>Depense total</h4>
                        </div>
                        <div className="card-data">
                            <h3>{stat? formatPrice(stat.totalCost) : "---"}</h3>
                        </div>
                    </div>


                    <div className="card" style={{backgroundColor: "#F6C762"}} >
                        <div className="card-head">
                            <div className="illustration">
                                <ProviderIco/>
                            </div>
                            <h4>fournisseurs</h4>
                        </div>
                        <div className="card-data">
                            <h3>{stat? stat.numProviders : "---"}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeBoard;