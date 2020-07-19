const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search json and filters it
const searchStates = async (searchText) => {
  const res = await fetch('../data/state_capitals.json');
  const states = await res.json();

  //get matches to current text-input
  let matches = states.filter((state) => {
    const regex = RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body">
        <h4> ${match.name} (${match.abbr})</h4>
        <span class="text-primary">${match.capital}</span>
        <small> Lat: ${match.lat} / Long: ${match.long}</small>
        </div>`
      )
      .join('');
    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value));
