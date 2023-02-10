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
     */
    function replace(originalWord, newWord) {
      const beastImage = document.createElement("img");
      beastImage.setAttribute("src", beastURL);
      beastImage.style.height = "100vh";
      beastImage.className = "beastify-image";
      document.body.appendChild(beastImage);
    }
  
    /**
     * Listen for messages, upon receiving one, run replace()
     */
    browser.runtime.onMessage.addListener((message) => {
      replace(message.originalWord, message.replaceWith)
    });
  })();