import {useState, useEffect} from "react";
import './Search.css';
import ChangeLanguage from "./ChangeLanguage.js";
import ChangePage from "./ChangePage.js";
import ChangeSearchType from "./ChangeSearchType";
import Results from "./Results.js";
import Tests from "./Tests.js";
import $ from "jquery";
import wordsList from "./WordsList.js";

function Search() {

    const [query, setQuery] = useState(''); // it represents the data given by the user in the search input
    const [pageNumber, setPageNumber] = useState(1) // given 30 results are shown on one page, the user needs to be able to change the page number
    const [searchType, setSearchType] = useState('repositories'); // if the user doesn't modify it, type values 'repositories' initially
    const [numberOfResults, setNumberOfResults] = useState(0); // it enables no to request a page that doesn't exist
    const [APIRateLimit, setAPIRateLimit] = useState(false);
    const [results, setResults] = useState([]); // results is a JSON object comprising the data got with the request
    const [languagesQuery, setLanguagesQuery] = useState(''); // languagesQuery (linked with the languages chosen by the user) is the exact str to add in the request
    const [url, setUrl] = useState('');


    function handleChange(event) {
        setQuery(event.target.value);
    };

    async function goToURL() {
        $.ajax({
            type: 'GET',
            url,
            statusCode: {
                200: function(response) {
                    setResults(response['items']);
                    setNumberOfResults(response['total_count']);
                    setAPIRateLimit(false);
                },
                403: function() {
                    alert('API rate limit is exceeded');
                    setAPIRateLimit(true);
                }
            }
        }
        )
    };

    useEffect(() => {
        if (query != '') { // this condition enables to avoid an error
            goToURL()
        }
    }, [url]); // everytime the url is modified, results is updated so that the data shown on screen is modified

    useEffect(() => { // no language must be requested when topics is chosen
        if (searchType === 'topics') {
            setLanguagesQuery('')
        }
    });

    useEffect(() => {setUrl('https://api.github.com/search/' + searchType + '?page=1&q=' + query + languagesQuery); setPageNumber(1)}, [query, searchType, languagesQuery]);
    // everytime a parameter (except for pageNumber) is modified, the url is updated and pageNumber comes back to 1
    
    useEffect(() => {setUrl('https://api.github.com/search/' + searchType + '?page=' + pageNumber + '&q=' + query + languagesQuery)}, [pageNumber]);

    return (
        <div className="search-page">
            <Tests query={query} languagesQuery={languagesQuery} searchType={searchType} results={results} numberOfResults={numberOfResults}/>
            <div className="search-input">
                <input
                    className="container-input"
                    type="text" 
                    placeholder="Search..."
                    onChange={handleChange}/>
            </div>
            <ChangePage pageNumber={pageNumber} numberOfResults={numberOfResults} setPageNumber={setPageNumber}/>
            <div className="types-and-languages">
                <div className="types">
                    <div>
                        <h4 className="types-column-title">
                            Type
                        </h4>             
                        <ChangeSearchType searchType={searchType} setSearchType={setSearchType}/>
                    </div>
                </div>
                <div className="languages">
                    {searchType == 'topics' // topics and languages cannot be in a same query
                        ? <div></div>
                        : <div>
                            <h4 className="languages-column-title">
                                Language
                            </h4>
                            <ChangeLanguage languagesQuery={languagesQuery} setLanguagesQuery={setLanguagesQuery}/>
                        </div>
                    }
                </div>
                </div>
            {APIRateLimit 
                ? <div>
                    <p className="rate-limit-exceededs"> API rate limit exceeded : please try again in a few seconds</p>
                </div>
                : <Results searchType={searchType} results={results}/> 
            }
        </div>
    );
}

export default Search;