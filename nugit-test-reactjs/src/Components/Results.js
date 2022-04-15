import "./Results.css"

/**
 * Displays the results associated with the user's request.
 */

function Results(props) {

    return (
        <div>
            {props.results.map((item) => {
                // the data shown changes with the type of the results considered
                if (props.searchType === 'repositories') {
                    return (
                        <div>
                            <div className="results-container">
                                <p className="repo-name"> {item['owner']['login']}/{item['name']} </p>
                                <p className="description"> {item['description']} </p>
                                <p className="date"> {item['created_at'].slice(0,10)} </p>
                            </div>
                            <div className="small-padding"></div>
                        </div>
                    )} else if (props.searchType === 'topics') {
                        return (
                            <div>
                                <div className="results-container">
                                    <p className="repo-name"> {item['name']} </p>
                                    <p className="description"> {item['description']} </p>
                                    <p className="date"> {item['created_at'].slice(0,10)} </p>
                                </div>
                                <div className="small-padding"></div>
                            </div>
                        )
                    } else if (props.searchType === 'issues') {
                        return (
                            <div>
                                <div className="results-container">
                                    <p className="repo-name"> {item['title']} </p>
                                    <p className="date"> {item['state']} / {item['created_at'].slice(0,10)} </p>
                                </div>
                                <div className="small-padding"></div>
                            </div>
                        )
                    } else if (props.searchType === 'commits') {
                        return (
                            <div>
                                <div className="results-container">
                                    <p className="repo-name"> {item['url']} </p>
                                    {/* I display commit url here because I cannot access the commit message for some reason*/}
                                </div>
                                <div className="small-padding"></div>
                            </div>
                        )
                    }
            })}
        </div>
    )
}

export default Results;