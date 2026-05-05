const colorPicker = document.getElementById("cop");
const colorInput = document.getElementById("editor");

colorPicker.addEventListener('input', () => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed || !colorInput.contains(range.commonAncestorContainer)) return;

  const span = document.createElement('span');
  span.style.color = colorPicker.value;

  try {
    const content = range.extractContents();
    span.appendChild(content);
    range.insertNode(span);
  } catch (e) {
    console.error(e);
  }

  sel.removeAllRanges();
});