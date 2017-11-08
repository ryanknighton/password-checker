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
  select.value = 16;
}

function passwordChanged() {
  pw = document.getElementById('input').value;
  console.log(pw);
  return pw;
}

function generate() {
  let validSet = new Array();
  let pass = new Array();

  let excluded = excludedChars();
  fltrNumbers = numbers.filter(x => !excluded.has(x));
  fltrSymbols = symbols.filter(x => !excluded.has(x));
  fltrAlphabetUpper = alphabetUpper.filter(x => !excluded.has(x));
  fltrAlphabetLower = alphabetLower.filter(x => !excluded.has(x));
  console.log(excluded);
  console.log(fltrNumbers, fltrSymbols, fltrAlphabetUpper, fltrAlphabetLower);

  if (includeNum()) {
    pass.push(fltrNumbers[Math.floor(Math.random()*fltrNumbers.length)])
    validSet = validSet.concat(fltrNumbers);
  }

  if (includeSym()) {
    pass.push(fltrSymbols[Math.floor(Math.random()*fltrSymbols.length)])
    validSet = validSet.concat(fltrSymbols);
  }

  if (includeUpper()) {
    pass.push(fltrAlphabetUpper[Math.floor(Math.random()*fltrAlphabetUpper.length)])
    validSet = validSet.concat(fltrAlphabetUpper);
  }

  if (includeLower()) {
    pass.push(fltrAlphabetLower[Math.floor(Math.random()*fltrAlphabetLower.length)])
    validSet = validSet.concat(fltrAlphabetLower);
  }

  let length = getLength();
  for (let i = pass.length; i < length; i++) {
    let item = validSet[Math.floor(Math.random()*validSet.length)];

    pass.push(item);
  }

  shuffle(pass);
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
  let excluded = new Set(document.getElementById('excluded').value.split(''));
  return excluded;
}

function getLength() {
  return document.getElementById('length').value;
}

function displayPass(pass) {
  let dispBox = document.getElementById('output');
  dispBox.value = pass;
}

// Fisher-Yates Shuffle
function shuffle(array) {
    let i = array.length;

    while (i > 0) {
        let rand = Math.floor(Math.random() * i);
        i--;

        let temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }

    return array;
}
