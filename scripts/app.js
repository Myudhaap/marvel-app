const btnSearch = document.querySelector('.search-btn')
const inputSearch = document.querySelector('.search-input')
const listSearch = document.querySelector('.search-list')
const result = document.querySelector('.result')

const [timeStamp, apiKey, hashValue] = [ts, publicKey, hs];

let urlApi;

const displayWords = name => {
  inputSearch.value = name;
}

const generatedList = datas => {
  listSearch.innerHTML = '';
  listSearch.classList.remove('fade')
  datas.data.results.forEach(value => {
    const name = value.name;
    const listEl = document.createElement('div')
    listEl.classList.add('list')
    listEl.setAttribute('onclick', 'displayWords("'+name+'")');
    let word = `<b>${name.substr(0, inputSearch.value.length)}</b>${name.substr(inputSearch.value.length)}`;
    console.log(word)
    listEl.innerHTML = word;
    listSearch.appendChild(listEl)
  })
}

const generatedResult = datas => {
  datas.data.results.forEach(value => {
    result.innerHTML = `
    <div class="image-wrap">
    <img src="${value.thumbnail.path}.${value.thumbnail.extension}" alt="Hero Image">
    </div>
    <h3 class="result-title">${value.name}</h3>
    <p class="result-text">${value.description}</p>
    `;
  })
}

btnSearch.onclick = async () => {
  try {
    urlApi = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&name=${inputSearch.value}`;
    const res = await fetch(urlApi);
    const data = await res.json();
    generatedResult(data)
    listSearch.classList.add('fade')
    inputSearch.value = '';
  } catch (error) {
    if(inputSearch.value.length < 1){
      alert('Data tidak boleh kosong')
    }
  }
}

inputSearch.onkeyup = async (e) => {
    urlApi = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${inputSearch.value}`;
    const res = await fetch(urlApi);
    const datas = await res.json();
    if(datas.code !== 200){
      listSearch.classList.add('fade')
      return false
    }
    generatedList(datas)
}