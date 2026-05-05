const colorPicker = document.getElementById("cop");
const colorInput = document.getElementById("editor");

colorPicker.addEventListener('input', () => {
  colorInput.focus();

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  
  if (!colorInput.contains(range.commonAncestorContainer)) {
      return;
  }

  document.execCommand('foreColor', false, colorPicker.value);
});