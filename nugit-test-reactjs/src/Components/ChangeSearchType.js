import "./ChangeSearchType.css";

/**
 * Enables the user to modify the type of results displayed on screen.
 * Please note that a result has one and only one type.
 */

function ChangeSearchType(props) {

    const types = ['repositories', 'commits', 'issues', 'topics']

    return (
        <div>
            {types.map((type, index) => { 
                // the selected button is different from the others
                if (props.searchType === type) {
                    return (
                        <div key={index}>
                            <button 
                                className="type-button-selected"
                                onClick={(() => props.setSearchType(type))}>
                            {type}
                            </button>
                        </div>
                    )} else {
                        return (
                            <div key={index}>
                                <button 
                                    className="type-button"
                                    onClick={(() => props.setSearchType(type))}>
                                {type}
                                </button>
                            </div>
                        )}
            })}
        </div>
    )
}

export default ChangeSearchType;