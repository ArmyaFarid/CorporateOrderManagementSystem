import { ReactComponent as SearchIco } from '../../assets/icons/searchIco.svg';

function ResumeBoardHead({parentWidth,showForm,setSearchString,searchString}) {
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchString(value);
    };
    return (
        <div className="component-header" style={{width:parentWidth}}>
            <div className="page-label">
                <h5>Accueil</h5>
            </div>


        </div>
    );
}

export default ResumeBoardHead;