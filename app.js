const colorPicker = document.getElementById("cop");
const colorInput = document.getElementById("editor");
let fileHandle

let savedRange = null;

function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (colorInput.contains(range.commonAncestorContainer)) {
            return range;
        }
    }
    return null;
}

const updateRange = () => {
    const range = saveSelection();
    if (range) savedRange = range;
};

colorInput.addEventListener('keyup', updateRange);
colorInput.addEventListener('mouseup', updateRange);
colorInput.addEventListener('click', updateRange);

colorPicker.addEventListener('input', () => {
    colorInput.focus();

    if (savedRange) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
    }

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (selection.isCollapsed) {
        const span = document.createElement("span");
        span.style.color = colorPicker.value;
        span.appendChild(document.createTextNode("\u200B"));
        
        range.insertNode(span);
        
        const newRange = document.createRange();
        newRange.setStart(span.childNodes[0], 1);
        newRange.collapse(true);
        
        selection.removeAllRanges();
        selection.addRange(newRange);
        savedRange = newRange;
    } else {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, colorPicker.value);
        updateRange();
    }
});

