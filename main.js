const alphabetLower = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = '1234567890'.split('');
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');

function populateSelect() {
  let select = document.getElementById('length');

  let weak = document.createElement('optgroup');
  weak.label = 'Weak';
  let strong = document.createElement('optgroup');
  strong.label = 'Stong';

  for (let i = 4; i < 16; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    weak.appendChild(opt);
  }

  for (let i = 16; i <= 50; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    strong.appendChild(opt);
  }

  select.appendChild(weak);
  select.appendChild(strong);
}

function passwordChanged() {
  pw = document.getElementById('input').value;
  console.log(pw);
  return pw;
}

function generate() {
  let validSet = new Array();

  if (includeNum()) {
    validSet = validSet.concat(numbers);
  }

  if (includeSym()) {
    validSet = validSet.concat(symbols);
  }

  if (includeUpper()) {
    validSet = validSet.concat(alphabetUpper);
  }

  if (includeLower()) {
    validSet = validSet.concat(alphabetLower);
  }

  let excluded = excludedChars();
  validSet = validSet.filter(x => excluded.indexOf(x) < 0 );

  let pass = new Array();

  let length = getLength();
  for (let i = 0; i < length; i++) {
    let item = validSet[Math.floor(Math.random()*validSet.length)];

    pass.push(item);
  }

  displayPass(pass.join(''));
}

function includeNum() {
  return document.getElementById('numbers').checked;
}

function includeSym() {
  return document.getElementById('symbols').checked;
}

function includeUpper() {
  return document.getElementById('uppers').checked;
}

function includeLower() {
  return document.getElementById('lowers').checked;
}

function excludedChars() {
  return document.getElementById('excluded').value.split();
}

function getLength() {
  return document.getElementById('length').value;
}

function displayPass(pass) {
  let dispBox = document.getElementById('output');
  dispBox.value = pass;
}
