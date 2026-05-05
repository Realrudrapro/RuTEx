const colorPicker = document.getElementById("cop");
const colorInput = document.getElementById("editor");

let savedRange = null;

function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (colorInput.contains(range.commonAncestorContainer)) {
            savedRange = range;
        }
    }
}

document.addEventListener('selectionchange', () => {
    if (document.activeElement === colorInput) {
        saveSelection();
    }
});

colorPicker.addEventListener('mousedown', () => {
    saveSelection();
});

colorPicker.addEventListener('input', () => {
    if (savedRange) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);

        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, colorPicker.value);
        
        saveSelection();
    }
});