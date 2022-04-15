import "./ChangePage.css";

/**
 * Enables the user to change the page of results : the screen then shows previous or following data.
 */

function ChangePage(props) {

    function goToPreviousPage() {
        if (props.pageNumber > 1) {
            props.setPageNumber(props.pageNumber - 1)
        }
        else {};
    }

    function goToFollowingPage() {
        const totalOfPages = ~~(props.numberOfResults/30);
        if (props.pageNumber + 1 <= totalOfPages && props.pageNumber + 1 <= 100) {
            props.setPageNumber(props.pageNumber + 1)
        }
        else {};
    }

    return (
        <div className="change-pages-buttons">
            <button 
                className="change-page"
                onClick={goToPreviousPage}> 
                Previous page
            </button> 
            <button 
                className="change-page"
                onClick={goToFollowingPage}>
                Following page
            </button>  
        </div>
    )
}

export default ChangePage;