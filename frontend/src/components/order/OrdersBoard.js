import OrdersHead from "./OrderBoarsHead";
import OrdersTable from "./table/OrdersTable";
import FormWrapper from "./forms/FormWrapper";
import {useEffect, useRef, useState} from "react";

function OrdersBoard() {

    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [formModal, setFormModal] = useState(false);
    const [reloadData, setReloadData] = useState(0);
    const [searchString, setSearchString] = useState('');


    const hideForm=()=>{
        setFormModal(false);
    }

    const showForm = ()=>{
        setFormModal(true);
    }

    const handeReloadOrders=()=>{
        setReloadData(reloadData+1);
    }
    const handleResize = () => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    };

    useEffect(() => {
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
            <OrdersHead parentWidth={dimensions.width} showForm={showForm} searchString={searchString} setSearchString={setSearchString}/>
            <div className="component-body">
                <OrdersTable reloadData={reloadData} pageWidth={dimensions.width} searchString={searchString}/>
                <FormWrapper parentWidth={dimensions.width} hideForm={hideForm} formModal={formModal} handeReloadOrders={handeReloadOrders}/>
            </div>
        </div>
    );
}

export default OrdersBoard;