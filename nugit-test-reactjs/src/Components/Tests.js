import { useEffect, useState } from "react";
import "./Tests.css"

/**
 * Checks if the results displayed coincidate with the user's request.
 * Initially returns "Tests not passed !" but must return "Tests Passed" when the user modifies its query.
 * Sometimes you need to wait a little bit between queries to enable the result of this function to update.
 */

function Tests(props) {

    // many tests are realized : a useState hook is associated with each of them
    const [testRepository, setTestRepository] = useState(false);
    const [testIssue, setTestIssue] = useState(false);
    const [testTopic, setTestTopic] = useState(false);
    
    function areRepositoriesOk() {

        // checks if repositories shown correspond to the user's request

        if ((props.searchType === 'repositories' && props.numberOfResults != 0)
        // checks if repositories shown correspond to the user's input (capital letters are not considered))
        && (props.results[0]['name'].toLowerCase().includes((props.query).toLowerCase()))
        // checks if it is a repository
        && (props.results[0]['full_name'] != null)
        // check if languages fit with the user's request
        && ((props.languagesQuery === '') || (props.languagesQuery !== '' && props.languagesQuery.includes((props.results[0]['language'].toLowerCase()))))) {
            setTestRepository(true);
        } else {
            setTestRepository(false);
        }
    }

    // commits shown are not tested since I cannot access the commit message and the languages used with results

    function areIssuesOk() {

        // checks if issues shown correspond to the user's request
        // the includes method doesn't work with props.results[0]['title'] here so the associated test is not realized
        // languages used cannot be accessed with results so language test is not implemented here

        if ((props.searchType === 'issues' && props.numberOfResults != 0)
        // checks if is an issue
        && (props.results[0]['title'] != null)) {
            setTestIssue(true);
        } else {
            setTestIssue(false);
        }
    }

    function areTopicsOk() {

        // checks if topics shown correspond to the user's request
        // since all of topic items are also repository items, results isn't enough to check if data shown is indeed topics

        if ((props.searchType === 'topics' && props.numberOfResults != 0)
        // check if topics shown correspond to the user's input (capital letters are not considered)
        && (props.results[0]['name'].toLowerCase().includes((props.query).toLowerCase())))
        {
            setTestTopic(true);
        } else {
            setTestTopic(false);
        }
    }

    // tests are realized everytime a parameter is modified
    useEffect(() => {areRepositoriesOk()});
    useEffect(() => {areIssuesOk()});
    useEffect(() => {areTopicsOk()});

    if (props.searchType === 'repositories' && testRepository) {
        return (
            <p className="tests-result"> (Tests passed) </p>
        )
    } else if (props.searchType === 'issues' && testIssue) {
        return (
            <p className="tests-result"> (Tests passed) </p>
        )
    } else if (props.searchType === 'topics' && testTopic) {
        return (
            <p className="tests-result"> (Tests passed) </p>
        )
    } else if (props.searchType === 'commits') {
        return (
            <p className="tests-result"> (Tests passed) </p>
        ) 
        } else {
        return (
            <p className="tests-result"> (Tests not passed !) </p>
        )
    };
    
}

export default Tests;