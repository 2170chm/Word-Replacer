// Parts of this file were copied from Mozilla's "Your Second Extension"
// article, found at https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension

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
        * If the replace button is clicked, then call the replace() method on
        * the active tab, and call the error report function if an error occurs.
        */
        if (e.target.textContent == "Replace") {
            browser.tabs
            .query({ active: true, currentWindow: true })
            .then(replace)
            .catch(reportError);
        }
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
