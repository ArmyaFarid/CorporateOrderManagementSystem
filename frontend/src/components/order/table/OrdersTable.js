import OrderRow from "./OrderRow";
import Api from "../../../helper/Api"
import {useEffect, useState} from "react";
import ServerErrorComponent from "../../utils/ServerErrorComponent";
import LoadingIndicator from "../../utils/LoadingIndicator";

function OrdersTable({reloadData,pageWidth,searchString}) {

    const [groupedOrders, setGroupedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [changing, setChanging] = useState(1);
    const [error, setError] = useState(null);

    function doChanging() {
        setChanging(changing + 1);
    }

    const retryFetch = () => {
        doChanging();
        setError(null);
    }

    // Function to group orders by state
    const groupOrdersByState = (orders) => {
        const statesOrder = ["WAITING", "CANCEL", "PAYMENT" ,"DELIVERING","DELIVERED"];
        return statesOrder.reduce((acc, state) => {
            acc[state] = orders.filter((order) => order.state === state);
            return acc;
        }, {});
    };

    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {
        setIsLoading(true);
        api.fetchData('/order?name='+searchString)
            .then((data) => {
                setGroupedOrders(groupOrdersByState(data));
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Les données ne peuvent pas être récupérées, réessayez plus tard');
                console.error('NetworkError:', error);
            });

    }, [changing,reloadData,searchString]);


    return (
        <>
            {error && <div><ServerErrorComponent retryFetch={retryFetch}/></div>}

            {
                !error &&
                <table>
                    <thead>
                    <tr className="table-main-head">
                        <th>Nom</th>
                        <th>Categorie</th>
                        <th>Prix Unit</th>
                        <th>Quantite</th>
                        <th>Prix Total</th>
                        <th>État d'acquisition</th>
                        <th></th>
                    </tr>
                    </thead>

                    {
                        !isLoading &&
                        <>
                            <thead className="table-section-label-thead">
                            <tr className="table-section-label">
                                <th colSpan="7">En cours de livraison</th>
                            </tr>
                            </thead>

                            <tbody>

                            {groupedOrders["DELIVERING"].length > 0  && groupedOrders["DELIVERING"].map((data) => (
                                    <OrderRow order={data} doChanging={doChanging}  pageWidth={pageWidth} handleReloadTable={doChanging} key={data._id}/>
                                )
                            )}

                            {groupedOrders["DELIVERING"].length <= 0 &&
                                <tr className="table-section-label">
                                    <td colSpan="7" style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}>Pas de livraison en cours</td>
                                </tr>
                            }



                            </tbody>

                            <thead className="table-section-label-thead">
                            <tr className="table-section-label">
                                <th colSpan="7">En attente de paiement</th>
                            </tr>
                            </thead>

                            <tbody>


                            {groupedOrders["PAYMENT"].length > 0 && groupedOrders["PAYMENT"].map((data) => (
                                    <OrderRow order={data} doChanging={doChanging}  pageWidth={pageWidth} handleReloadTable={doChanging} key={data._id}/>
                                )
                            )}
                            {groupedOrders["PAYMENT"].length <= 0 &&
                                <tr className="table-section-label">
                                    <td colSpan="7" style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}>Pas de paiement en attente</td>
                                </tr>
                            }
                            </tbody>

                            <thead className="table-section-label-thead">
                            <tr className="table-section-label">
                                <th colSpan="7">En cours de traitement par le fournisseur</th>
                            </tr>
                            </thead>
                            <tbody>

                            {groupedOrders["WAITING"].length > 0  && groupedOrders["WAITING"].map((data) => (
                                    <OrderRow order={data} doChanging={doChanging} pageWidth={pageWidth} handleReloadTable={doChanging} key={data._id}/>
                                )
                            )}
                            {groupedOrders["WAITING"].length <= 0 &&
                                <tr className="table-section-label">
                                    <td colSpan="7" style={{backgroundColor:"transparent",border:0,color:"#ACACAC"}}>Aucune commande n'est en cours de traitement par le fournisseur</td>
                                </tr>
                            }

                            </tbody>
                        </>
                    }
                    <LoadingIndicator isLoading={isLoading}/>
                </table>
            }
        </>
    );
}

export default OrdersTable;