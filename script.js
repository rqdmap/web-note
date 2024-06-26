function uploadContent() {

    // If textarea value changes.
    if (content !== textarea.value) {
        var temp = textarea.value;
        var request = new XMLHttpRequest();

        request.open('POST', window.location.href, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            // Request has ended, check again after 1 second.
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    content = temp;
                } else {
                    showNotification('Error: ' + request.status + ' ' + request.responseText);
                }
                setTimeout(uploadContent, 1000);
            }
        }

        request.onerror = function() {
            // Try again after 1 second.
            setTimeout(uploadContent, 1000);
            showNotification('There was a network error..?');
        }
        request.send('text=' + encodeURIComponent(temp));

        // Make the content available to print.
        printable.removeChild(printable.firstChild);
        printable.appendChild(document.createTextNode(temp));
    }
    else {

        // Content has not changed, check again after 1 second.
        setTimeout(uploadContent, 1000);
    }
}

var textarea = document.getElementById('content');
var printable = document.getElementById('printable');
var content = textarea.value;

// Make the content available to print.
printable.appendChild(document.createTextNode(content));

textarea.focus();
uploadContent();

// save 
Mousetrap.bind('mod+s', function () {
    uploadContent();
    showNotification("content saved");
    return false;
});

const input = document.getElementById('content');
input.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const tab = '\t';
        this.value = this.value.substring(0, start) + tab + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + tab.length;
    }
});

document.getElementById("content").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "\n" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

