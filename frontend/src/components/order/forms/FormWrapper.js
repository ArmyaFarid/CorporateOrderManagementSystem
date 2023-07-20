import './FormWrapper.css'
import CreateOrderForm from "./create/CreateOrderForm";
import UpdateForm from "./update/UpdateOrderForm";
function FormWrapper({parentWidth,formModal,hideForm,handeReloadOrders,update,id}) {
    return(
        <>
            {
              formModal &&
                <div className="form-wrapper" style={{width:parentWidth}} >
                    {!update && <CreateOrderForm hideForm={hideForm} doChanging={true} handeReloadOrders={handeReloadOrders}/>}

                    {update && <UpdateForm hideForm={hideForm} orderId={id} handeReloadOrders={handeReloadOrders}/>}
                </div>
            }
        </>

    );
}
export default FormWrapper;