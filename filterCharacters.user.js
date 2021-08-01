// ==UserScript==
// @name         PoE Character Filter
// @namespace    https://github.com/Saga-
// @version      1.0
// @description  Adds a filter dropdown to a PoE account's character page
// @author       Saga-
// @match        https://*.pathofexile.com/account/view-profile/*/characters
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==


waitForKeyElements('.character.active', (el) => {
    const CHARACTER_SECTION_CLASS = '.character';
    const LEAGUE_CLASS = '.infoLine3';
    const NAME_CLASS = '.infoLine1';
    const NAME_HEADER = 'h2';
    const ALL_VALUE = '--ALL--';

    let leagueObj = {};

    // Get list of characters
    const characters = Array.from(document.querySelectorAll(CHARACTER_SECTION_CLASS));

    // Insert select box underneath Characters header
    const header = document.querySelector(NAME_HEADER);
    const selectBox = document.createElement('select');
    header.parentNode.insertBefore(selectBox, header.nextSibling);

    // Add list of characters to an object, with their league as the key
    characters.map(character => {
        const league = character.querySelector(LEAGUE_CLASS).textContent;
        const charName = character.querySelector(NAME_CLASS).textContent;
        if (leagueObj.hasOwnProperty(league)) {
            leagueObj[league].push(charName);
        } else {
            leagueObj[league] = [charName];
        }
    });

    // Sort the leagues by alphabetical order and add an 'ALL' option at the beginning
    const leagues = Object.keys(leagueObj).sort();
    leagues.unshift(ALL_VALUE);
    // Add leagues to the select box
    leagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league;
        option.text = league;
        selectBox.appendChild(option);
    });


    // Listen for a change event, reset the options so that all are shown to be filtered again with the chosen league
    selectBox.addEventListener('change', () => {
        resetCharacters();
        const selectedLeague = leagues[selectBox.selectedIndex];
        if (selectedLeague !== ALL_VALUE) {
            characters.forEach(character => {
                const leagueName = character.querySelector(LEAGUE_CLASS).textContent;
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

}, true);
