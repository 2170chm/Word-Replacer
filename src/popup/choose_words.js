/**
* Upon click of the button, send the user input to the script for processing
*/
function listenForBtnClicks() {
    document.addEventListener("click", (e) => { 
        /**
        * send the original word and new word to the script for processing
        */
        function replace(tabs) {
            let original = document.querySelector("#original").value;
            let newWord = document.querySelector("#newWord").value;
            browser.tabs.sendMessage(tabs[0].id, {
                command: "replace",
                originalWord: original,
                replaceWith: newWord
            });
        }

        /**
        * Display the error in the console
        */
        function reportError(error) {
            console.error(`Encountered an error: ${error}`);
        }

        /**
        * Call the replace() method on the active tab, and call the error report function if an error occurs
        */
        browser.tabs
        .query({ active: true, currentWindow: true })
        .then(replace)
        .catch(reportError);
    });
}

/**
* Upon occurrence of an error running the script, log the error message
* and replace the popup content with the error notification
*/
function reportScriptError(error) {
document.querySelector("#popup").classList.add("hidden");
document.querySelector("#error").classList.remove("hidden");
console.error(`Word_Replacer Script Failed: ${error.message}`);
}

/**
* Run the script on occurrence of popup and listen for the button click.
* Run reportScriptError() if an error occurs
*/
browser.tabs
.executeScript({ file: "../content_scripts/word_replacer.js" })
.then(listenForBtnClicks)
.catch(reportScriptError);