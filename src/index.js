const getIdBtn  = document.querySelector('#getID'),
      prefBtn   = document.querySelector('#pref'),

      idCount   = document.querySelector('#idCount'),
      timeCount = document.querySelector('#timeCount'),
      textarea  = document.querySelector('#textarea');

let   uidsToCut = false, uids = "", newLineChars = [-1], cutCounter = 0, prefix, suffix;

const cutIds = () => {
  cutCounter += 100;
  let r = newLineChars[cutCounter],
      cutIds = uids.substring(0, r),
      content = "";

  if (prefix !== null) content += prefix + " ";
  content += cutIds;
  if (suffix !== null) content += " " + suffix;

  navigator.clipboard.writeText(content).then(() => {
    let remainingIdArr = textarea.value.split('\n').slice(100);
    textarea.value = remainingIdArr.join('\n');
    idCount.innerHTML = "UIDs remaining: " + (remainingIdArr.length-1);

    M.textareaAutoResize(textarea);
    if (!remainingIdArr.length > 0) reset();

  }, err => {
    console.error('Async: Could not copy text: ', err);
  });
  return true;
}

const reset = () => {
  uids = "";
  newLineChars = [-1];
  cutCounter = 0;
  uidsToCut = false;

  idCount.innerHTML = "UIDs extracted: -";
  timeCount.innerHTML = "Time Taken: -";
  textarea.value = "";
  M.textareaAutoResize(textarea);

  getIdBtn.innerHTML = "Get UIDs";
  getIdBtn.addEventListener('click', getIDs, {once: true});
}

const getIDs = () => {
  let t0 = performance.now(),
      text = textarea.value,
      textlen = text.length;

  for (let i = 0; i < textlen; ++i)
    if (text[i] === '(' && text[i - 6] === '#') {

      let idLen = 1;
      while(text[++i] !== ')') {
        uids += text[i];
        ++idLen;
      }

      uids += "\n";
      let arrLen = newLineChars.length;
      newLineChars[arrLen] = newLineChars[arrLen-1] + idLen;
    }

  if (uids === "") uids = "No User IDs found";

  let t1 = performance.now();
  textarea.value = uids;
  M.textareaAutoResize(textarea);
  idCount.innerHTML = "UIDs extracted: " + (newLineChars.length-1);
  timeCount.innerHTML = "Time Taken: " + (Math.round(t1 - t0)) + "ms";

  uidsToCut = true;
  getIdBtn.innerHTML = "Cut next 100";
  getIdBtn.addEventListener('click', cutIds);
}

const ctrlEnter = e => {
  if (e.ctrlKey && e.keyCode === 13)
    (uidsToCut && cutIds()) || getIDs();
}

getIdBtn.addEventListener('click', getIDs, {once: true});
document.addEventListener('keydown', ctrlEnter);
prefBtn.addEventListener('click', e => {
  window.open('src/about.html');
});
window.addEventListener('load', e => {
  if (window.innerWidth < 900) prefBtn.innerHTML = "More";

  prefix = window.localStorage.getItem('prefix'),
  suffix = window.localStorage.getItem('suffix');

  if (prefix === null) {
    window.localStorage.setItem('prefix', '!mban');
    prefix = '!mban';
  }
  if (suffix === null) {
    window.localStorage.setItem('suffix', 'Raid');
    suffix = 'Raid';
  }
})
