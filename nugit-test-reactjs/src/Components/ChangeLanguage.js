/**
 * Enables the user to update the languages of the results.
 * The user can choose several languages at the same time (OR function).
 */

function ChangeLanguage2(props) {

    const languages = ['any', 'python', 'javascript', 'html', 'css', 'php', 'c', 'java'];

    function selectYourLanguage(language) {
        // the user can come back to the initial request : results in any languages are then displayed
        if (language == 'any') {
            props.setLanguagesQuery('')
        } else {
            props.setLanguagesQuery(props.languagesQuery + '+language:' + language)
        };
    }

    return (
        <div>
            {languages.map((language) => 
                <div>
                    <button 
                        className="type-button"
                        onClick={(() => selectYourLanguage(language))}>
                    {language}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ChangeLanguage2;