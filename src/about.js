const prefixInput = document.querySelector('#prefix'),
      suffixInput = document.querySelector('#suffix');

const saveToLocal = e => {
  window.localStorage.setItem(e.target.id, e.target.value);
}

const checkLocal = e => {
  let prefix = window.localStorage.getItem('prefix'),
      suffix = window.localStorage.getItem('suffix');

  if (prefix === null) {
    window.localStorage.setItem('prefix', '!mban');
    prefix = '!mban';
  }
  if (suffix === null) {
    window.localStorage.setItem('suffix', 'Raid');
    suffix = 'Raid';
  }

  prefixInput.value = prefix;
  suffixInput.value = suffix;
}

prefixInput.addEventListener('input', saveToLocal);
suffixInput.addEventListener('input', saveToLocal);
window.addEventListener('load', checkLocal);
