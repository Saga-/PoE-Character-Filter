const characters = Array.from(document.querySelectorAll('.character'));

let leagueObj = {};

characters.map(character => {
    const league = character.querySelector('.infoLine3').textContent;
    const charName = character.querySelector('.infoLine1').textContent;
    if (leagueObj.hasOwnProperty(league)) {
        leagueObj[league].push(charName);
    } else {
        leagueObj[league] = [charName];
    }
});

const header = document.querySelector('h2');
const selectBox = document.createElement('select');
selectBox.id = 'filterCharacters';
header.parentNode.insertBefore(selectBox, header.nextSibling);


const leagues = Object.keys(leagueObj).sort();
// const allOption = document.createElement('option');
// allOption.value = 'ALL';
// allOption.text = '--ALL--';
// selectBox.appendChild(allOption);
leagues.unshift('--ALL--');

leagues.forEach(league => {
    const option = document.createElement('option');
    option.value = league;
    option.text = league;
    selectBox.appendChild(option);
});

// selectBox.addEventListener('change', $event => {
//     console.log($event);
// })


selectBox.addEventListener('change', () => {
    resetCharacters();
    const selectedValue = selectBox.selectedIndex;
    console.log(selectBox.selectedIndex);
    const selectedLeague = leagues[selectedValue];
    if (selectedLeague !== '--ALL--') {
        characters.forEach(character => {
            const leagueName = character.querySelector('.infoLine3').textContent;
            console.log(`character leauge: ${leagueName}`);
            console.log(`selected leauge: ${selectedLeague}`)
            // console.log(leagueName);
            // console.log(leagueName !== selectedLeague);
            if (leagueName !== selectedLeague) {
                toggleShowHide(character)
            }
        });
    }

});


function toggleShowHide(character) {
    character.style.display = character.style.display === '' ? 'none' : ''
}

function resetCharacters() {
    characters.forEach(character => character.style.display = '');
}