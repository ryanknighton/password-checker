const alphabetLower = 'abcdefghijklmnopqrstuvwxyz'.split('');
const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = '1234567890'.split('');
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
// 100+ random words to choose from
const words = [
  "toys","friction","gleaming","glue","spiky","attract","daily","own","ski",
  "unit","trade","bee","lovely","skirt","wandering","queue","drab","drawer",
  "vegetable","squeamish","axiomatic","painful","needy","shock","battle",
  "clip","better","juice","exuberant","equable","flashy","skinny","glorious",
  "decisive","nation","historical","magenta","belief","bake","quiver",
  "worried","rustic","laughable","push","flock","ablaze","impossible","nice",
  "sink","pipe","spotty","jumbled","jump","perfect","match","internal",
  "psychedelic","mushy","shelter","jaded","sky","rhyme","enjoy","receptive",
  "thunder","naive","null","elite","fragile","balance","walk","doubt",
  "future","knock","delirious","learn","exciting","acceptable","lying",
  "important","aberrant","cheer","order","breakable","lettuce","division",
  "sneeze","moaning","paste","notebook","versed","same","swanky","wink",
  "heartbreaking","puzzled","business","loving","private","field",
  "xylograph", "xenia", "yellow", "yawn", "yanked", "zenith", "zinger", "zonked"
];
var wordString = "";

$(document).ready(function () {
  $("#show").click(function(event) {
    // Removes focus of the button.
    $(this).blur();
  });

  $("#show").mouseover(function(event) {
    $("#input").attr('type', 'text');
  });

  $("#show").mouseleave(function(event) {
    $("#input").attr('type', 'password');
  });
});

function populateSelects() {
  let select = document.getElementById('length');

  let weak = document.createElement('optgroup');
  weak.label = 'Weak';
  let strong = document.createElement('optgroup');
  strong.label = 'Strong';

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

  let randomWord = document.getElementById('randNum');
  for (let i = 1; i < 25; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    randomWord.appendChild(opt);
  }
}

function generate() {
  let validSet = new Array();
  let pass = new Array();

  let excluded = excludedChars();
  fltrNumbers = numbers.filter(x => !excluded.has(x));
  fltrSymbols = symbols.filter(x => !excluded.has(x));
  fltrAlphabetUpper = alphabetUpper.filter(x => !excluded.has(x));
  fltrAlphabetLower = alphabetLower.filter(x => !excluded.has(x));

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

// Fisher-Yates Shuffle (standard implementation)
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

function getLength() {
  return document.getElementById('length').value;
}

function displayPass(pass) {
  let dispBox = document.getElementById('output');
  dispBox.value = pass;
}

function randomWord() {
  let acronym = document.getElementById('acronym').value;
  let newHTML = '';

  if (acronym) {
    for (let i = 0; i < acronym.length; i++) {
      let letter = acronym[i];
      newHTML += selectWord(letter) + ' ';
    }

    presentWords(newHTML);
  } else {
    var num = document.getElementById('randNum').value;
    var array = [];

    while (array.length < num) {
      var temp = words[Math.floor(Math.random() * words.length)];
      if (array.indexOf(temp) < 0) {
        newHTML += temp + ' ';
        array.push(temp);
      }
    }

    presentWords(newHTML);
  }

  wordString = newHTML;
  toSecureButton();
}

function selectWord(letter) {
  let filtered = words.filter(x => x[0] === letter);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function toSecureButton() {
  let button = document.getElementById('randWord');
  button.innerHTML = "Make Secure";
  button.onclick = makeSecure;
}

function toGenerateButton() {
  let button = document.getElementById('randWord');
  button.innerHTML = "Generate Another";
  button.onclick = randomWord;
}

function makeSecure() {
  let html = wordString.split(' ');
  let temp = new Array();
  for (let i = 0; i < html.length - 1; i++) {
    let randIndex = Math.floor(Math.random() * html[i].length);
    let word = html[i].substr(0, randIndex) + html[i][randIndex].toUpperCase() + html[i].substr(randIndex + 1);
    temp.push(word);
  }
  html = temp.join(' ');
  let nonLetterAlpha = numbers.concat(symbols);
  html = html.replace(/\s/g, function () {
    return nonLetterAlpha[Math.floor(Math.random() * nonLetterAlpha.length)];
  });
  presentWords(html);
  toGenerateButton();
}

function presentWords(str) {
  document.getElementById('randomwords').innerHTML = '<p class="alert alert-success"><strong>Generated Words - </strong>' + str +'</p>';
}
