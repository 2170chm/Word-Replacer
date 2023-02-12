// Parts of this file were copied from Mozilla's "Your Second Extension"
// article, found at https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension

(() => {
    /**
     * Global variable to prevent the script from being injected in the same page again.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Replace all occurrences of the first parameter 'originalWord' with
     * the second parameter 'newWord' in the current html
     *
     * The logic for replacing in-text instances of a word within a HTML body
     * was drawn from answers at https://stackoverflow.com/questions/5558613/replace-words-in-the-body-text
     */
    function replace(element, originalWord, newWord) {
        if (element.childNodes.length) {
            element.childNodes.forEach((child) => replace(child, originalWord, newWord));
        } else {
            const text = element.textContent;
            if (text) {
                element.textContent = text.replace(new RegExp(originalWord,"g"), newWord);
            }
        }
    }
  
    /**
     * Listen for messages, upon receiving one, run replace()
     */
    browser.runtime.onMessage.addListener((message) => {
        replace(document.body, message.originalWord, message.replaceWith);
    });
  })();
