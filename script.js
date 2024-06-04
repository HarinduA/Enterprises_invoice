document.addEventListener("DOMContentLoaded", function () {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Function to prompt confirmation
    function promptConfirmation(productName) {
        return confirm(`Do you want to proceed with ${productName}?`);
    }

    // Array to store clicked product names
    let clickedProducts = [];

    // Add event listener to all "Product Available" buttons
    const productButtons = document.querySelectorAll('.orderNow button');
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the product name
            const productName = this.parentNode.previousElementSibling.textContent.trim();

            // Prompt confirmation
            if (promptConfirmation(productName)) {
                // Encode the product name for URL
                const encodedProductName = encodeURIComponent(productName);
                // Redirect to a new page with the product name added to the URL
                window.location.href = `item.html?product=${encodedProductName}`;
            } else {
                // Save the product name in the array for later
                clickedProducts.push(productName);
            }
        });
    });

    // Event listener for displaying clicked products when user clicks OK
    window.addEventListener('beforeunload', function(e) {
        if(clickedProducts.length > 0) {
            const confirmationMessage = `You have clicked the following products:\n${clickedProducts.join('\n')}\n\nAre you sure you want to leave this page?`;
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Webkit, Safari, Chrome etc.
        }
    });
});
