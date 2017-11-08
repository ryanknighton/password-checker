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
  
  let randomWord = document.getElementById('randNum');
  for (let i = 1; i < 25; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    randomWord.appendChild(opt);
  }
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

function randomWord() {
  // 100 random words to choose from
  var words = ["toys","friction","gleaming","glue","spiky","attract","daily","own","ski","unit","trade","bee","lovely","skirt",
               "wandering","queue","drab","drawer","vegetable","squeamish","axiomatic","painful","needy","shock","battle","clip",
               "better","juice","exuberant","equable","flashy","skinny","glorious","decisive","nation","historical","magenta",
               "belief","bake","quiver","worried","rustic","laughable","push","flock","ablaze","impossible","nice","sink","pipe",
               "spotty","jumbled","jump","perfect","match","internal","psychedelic","mushy","shelter","jaded","sky","rhyme","enjoy",
               "receptive","thunder","naive","null","elite","fragile","balance","walk","doubt","future","knock","delirious","learn",
               "exciting","acceptable","lying","important","aberrant","cheer","order","breakable","lettuce","division","sneeze",
               "moaning","paste","notebook","versed","same","swanky","wink","heartbreaking","puzzled","business","loving","private",
               "field"];
  
  var num = document.getElementById('randNum').value;
  var paragraph = document.createElement("p");
  var array = [];
  
  while (array.length < num) {
    var randNum = Math.floor(Math.random() * num);
    if (array.indexOf(randNum) > -1) {
      var temp = document.createTextNode(words[randNum]);
      paragraph.appendChild(temp);
      array(array.length) = randNum;
    }
  }
  
  document.getElementById('randomword').appendChild(paragraph);
}
