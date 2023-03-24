var start = new Date(2022, 0, 1);
var day = Math.floor((Date.now() - start) / 86400000);
var stats = {
    lastPlayed: 0,
    totalPlayed: 0,
    won: 0,
    streakBest: 0,
    streak: 0
}
var settings = {
    dark: 2,
    hard: 0,
    copy: 0,
    discord: 0
}
//https://stackoverflow.com/a/15506705
const addStyle = (() => {
  const style = document.createElement('style');
  document.head.append(style);
  return (styleString) => style.textContent = styleString;
})();

document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode == 13) HMCheckValidGuess();
};

(async function() {
    'use strict';
    await new Promise(r => setTimeout(r, 500));
    if(localStorage.getItem('stats')){
        stats = JSON.parse(localStorage.getItem('stats'));
    }
    else localStorage.setItem('stats', JSON.stringify(stats));
    if(localStorage.getItem('settings')){
        settings = JSON.parse(localStorage.getItem('settings'));
    }
    else localStorage.setItem('settings', JSON.stringify(settings));
    if(settings.dark == 0) themeLight();
    if(settings.dark == 1) themeDark();
    if(settings.dark == 2 && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) themeDark();
    if(day-stats.lastPlayed > 1){
        stats.streak = 0;
        localStorage.setItem('stats', JSON.stringify(stats));
    }
    //await new Promise(r => setTimeout(r, 200));
    document.querySelector("body").style.opacity = 1;
    var settingsbutton = document.createElement("svg");
    settingsbutton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="mr-2 h-6 w-6 cursor-pointer"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' ;
    settingsbutton.addEventListener("click", openSettings, false);
    document.querySelector(".flex.w-80.mx-auto.items-center.mb-4").appendChild(settingsbutton);
    document.querySelector(".py-4 > div:nth-child(3) > div:nth-child(3) > button:nth-child(1)").classList.add("enterbtn");
    document.querySelector(".enterbtn").addEventListener("click", detectWinLoss, false);
    var fakeenter = document.querySelector(".enterbtn").cloneNode();
    document.querySelector(".enterbtn").style.height = 0;
    document.querySelector(".enterbtn").style.width = 0;
    document.querySelector(".enterbtn").style.display = "none";
    document.querySelector(".enterbtn").tabIndex = -1;
    fakeenter.innerText = "Enter";
    fakeenter.classList.remove("enterbtn");
    fakeenter.classList.remove("fakeenter");
    fakeenter.addEventListener("click", HMCheckValidGuess, false);
    document.querySelector(".py-4 > div:nth-child(3) > div:nth-child(3)").prepend(fakeenter);
    if(stats.lastPlayed == day && JSON.parse(localStorage.getItem('gameState')).guesses.includes(JSON.parse(localStorage.getItem('gameState')).solution)) replaceShare();
    if(stats.lastPlayed == day && !JSON.parse(localStorage.getItem('gameState')).guesses.includes(JSON.parse(localStorage.getItem('gameState')).solution) && JSON.parse(localStorage.getItem('gameState')).guesses.length == 6) displayLoss();
})();

async function detectWinLoss(){
    await new Promise(r => setTimeout(r, 100));
    try{
    if(document.querySelector(".leading-6").innerText == "You won!"){
        console.log("W");
        if(stats.lastPlayed != day) writeGameStat("w");
        replaceShare();
    }}
    catch{}
    try{
    if(document.querySelector(".text-sm").textContent.startsWith("You lost")){
        console.log("L");
        if(stats.lastPlayed != day) writeGameStat("l");
        displayLoss();
    }}
    catch{}
}

async function displayLoss(){
    var lostword = JSON.parse(localStorage.getItem('gameState')).solution;
    var el = document.querySelector(".h-6.w-6.cursor-pointer");
    if (el.fireEvent) {
        (el.fireEvent('onclick'));
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent('click', true, false);
        el.dispatchEvent(evObj);
    }
    await new Promise(r => setTimeout(r, 20));
    document.querySelectorAll(".flex.justify-center.mb-1.mt-4").forEach((div) => {
        div.style.display = "none";
    });
    document.querySelectorAll(".text-sm.text-gray-500").forEach((p) => {
        p.style.display = "none";
    });
    document.querySelector(".leading-6:first-child").innerText = "You fell off!";
    document.querySelector("div.mt-2:nth-child(2) > p:nth-child(1)").innerText = "The word was:"
    document.querySelector("div.mt-2:nth-child(2) > p:nth-child(1)").style.display = "block";
    document.querySelector("div.mt-2:nth-child(2) > p:nth-child(1)").style.fontSize = "16px";
    document.querySelector(".leading-6:nth-child(2)").classList.add("felloff");
    document.querySelector(".leading-6:nth-child(2)").innerText = lostword;
    document.querySelector(".leading-6:nth-child(2)").style = "text-align: center; display: block; margin: 10px auto auto auto; color: #E9B308; font-weight: bold; font-size: 20px; border: dashed #E9B308 3px; width: 110px; border-radius: 20px;";
    var sharebutton = document.createElement("button");
    sharebutton.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm";
    sharebutton.innerText = "Share";
    document.querySelector("div.mt-2:nth-child(3)").appendChild(sharebutton);
    sharebutton.addEventListener("click", function(){shareOrCopy("l")}, false);
}

async function replaceShare(){
    if(document.querySelector(".inline-flex.justify-center.w-full.rounded-md").innerText != "Share") return;
    var oldshare = document.querySelector(".inline-flex.justify-center.w-full.rounded-md");
    var newshare = oldshare.cloneNode();
    newshare.addEventListener("click", function(){shareOrCopy("w")}, false);
    newshare.innerText = "Share";
    oldshare.parentNode.replaceChild(newshare, oldshare);
}

function shareOrCopy(wl){
    var word = "";
    var asterisk = "";
    var miss = "⬜";
    if(document.querySelector("body").classList.contains("dark")) miss = "⬛";
    if(settings.hard == 1) asterisk="*"
    var gamestate = "wordle6.com " +day +asterisk +" X/6\n\n";
    for(var x=1;x<7;x++){
        word = "";
        for(var y=0;y<6;y++){
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("slate-400")) gamestate+=miss;
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("yellow")) gamestate+="🟨";
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("green")) gamestate+="🟩";
            word += document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].innerText;
        }
        if(!gamestate.includes("🟩🟩🟩🟩🟩🟩 ||")) if(settings.discord==1) gamestate+=" ||`"+word+"`||";
        if(!gamestate.includes("🟩🟩🟩🟩🟩🟩")) gamestate+="\n";
    }
    if(wl=="w"){
        gamestate=gamestate.replace("X", String((gamestate.match(/^\s*\S/gm) || "").length-1));
    }
    if(settings.copy == 1){
        navigator.clipboard.writeText(gamestate);
        document.querySelector(".inline-flex").innerText = "Copied!";
        return;
    }
    navigator.share ? navigator.share({text: gamestate}) : (navigator.clipboard.writeText(gamestate) ? document.querySelector(".inline-flex").innerText = "Copied!" : 0);
}

async function openSettings(){
    var el = document.querySelector(".h-6.w-6.cursor-pointer");
    if (el.fireEvent) {
        (el.fireEvent('onclick'));
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent('click', true, false);
        el.dispatchEvent(evObj);
    }
    await new Promise(r => setTimeout(r, 20));
    document.querySelectorAll(".flex.justify-center.mb-1.mt-4").forEach((div) => {
        div.style.display = "none";
    });
    document.querySelectorAll(".text-sm.text-gray-500").forEach((p) => {
        p.style.display = "none";
    });
    document.querySelector(".leading-6:nth-child(2)").innerText = "Misc";
    document.querySelector(".leading-6:first-child").innerText = "Stats";
    var statsDisp = document.createElement("div");
    statsDisp.innerHTML = '<div class="flex justify-center text-center my-2"><div class="items-center justify-center m-1 w-1/4"><div class="text-3xl font-bold statPlayed">0</div><div class="text-xs">Played</div></div><div class="items-center justify-center m-1 w-1/4"><div class="text-3xl font-bold statWin">0%</div><div class="text-xs">Win %</div></div><div class="items-center justify-center m-1 w-1/4"><div class="text-3xl font-bold statStreak">0</div><div class="text-xs">Current streak</div></div><div class="items-center justify-center m-1 w-1/4"><div class="text-3xl font-bold statStreakB">0</div><div class="text-xs">Best streak</div></div></div>';
    document.querySelector(".mt-2").prepend(statsDisp);
    var HMToggle = document.createElement("button");
    HMToggle.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm hmtoggle";
    HMToggle.innerText = "Enable hard mode";
    if(settings.hard == 1) {
        HMToggle.style.background = "#c41313";
        HMToggle.innerText = "Disable hard mode";
    }
    HMToggle.addEventListener("click", toggleHM, false);
    HMToggle.style.transition = "200ms ease";
    document.querySelector(".inline-block").appendChild(HMToggle);
    var toggledark = document.createElement("button");
    toggledark.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm toggledark";
    if(document.querySelector("body").className == "dark") toggledark.innerText = "Toggle light mode";
    else toggledark.innerText = "Toggle dark mode";
    toggledark.addEventListener("click", toggleDark, false);
    document.querySelector(".inline-block").appendChild(toggledark);

    var sharecopymode = document.createElement("button");
    sharecopymode.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm sharecopymode";
    sharecopymode.innerText = "Share mode: Default";
    if(settings.copy == 1) sharecopymode.innerText = "Share mode: Clipboard";
    sharecopymode.addEventListener("click", toggleCopyMode, false);
    document.querySelector(".inline-block").appendChild(sharecopymode);

    var shareformat = document.createElement("button");
    shareformat.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm shareformat";
    shareformat.innerText = "Share format: Default";
    if(settings.discord == 1) shareformat.innerText = "Share format: Discord";
    shareformat.addEventListener("click", toggleShareFormat, false);
    document.querySelector(".inline-block").appendChild(shareformat);

    var w6rand = document.createElement("a");
    w6rand.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm";
    w6rand.innerText = "Play a random Wordle 6";
    w6rand.href = "/wordle6/random6.html";
    document.querySelector(".inline-block").appendChild(w6rand);
    var w5rand = document.createElement("a");
    w5rand.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm";
    w5rand.innerText = "Play a random Wordle 5";
    w5rand.href = "/wordle6/random5.html";
    document.querySelector(".inline-block").appendChild(w5rand);
    var changename = document.createElement("button");
    changename.className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm";
    changename.innerText = "Change name";
    changename.addEventListener("click", resetName, false);
    document.querySelector(".inline-block").appendChild(changename);
    //read stats
    document.querySelector(".statPlayed").innerText = stats.totalPlayed;
    if(stats.totalPlayed!=0) document.querySelector(".statWin").innerText = ""+Math.trunc((stats.won/stats.totalPlayed)*100) +"%";
    document.querySelector(".statStreak").innerText = stats.streak;
    document.querySelector(".statStreakB").innerText = stats.streakBest;
    var statsmsg = document.createElement("p");
    statsmsg.innerText = "Stats counted since Dec 17, 2022";
    statsmsg.style.textAlign = "center";
    statsmsg.style.fontSize = "12px";
    statsmsg.style.opacity = "0.5";
    document.querySelector(".inline-block").appendChild(statsmsg);
}

function toggleDark(){
    if(document.querySelector("body").className == "dark") {
        document.querySelector(".toggledark").innerText = "Toggle dark mode";
        themeLight();
    }
    else{
        document.querySelector(".toggledark").innerText = "Toggle light mode";
        themeDark();
    }
}

function themeDark(){
    document.querySelector("body").style.background = "#111";
    document.querySelector("body").className = "dark";
    addStyle(`.bg-green-500, .bg-yellow-500, .inline-flex.justify-center.w-full.rounded-md, .sm\\:my-8, #root {filter: hue-rotate(180deg) invert(1);} .sm\\:my-8 {background: #eeecee;} .bg-slate-400 {color: black !important;} .text-xl.grow.font-bold::after{color: #834e00 !important;} .felloff {filter: hue-rotate(180deg) invert(1);}.bg-green-100 {filter: brightness(0.9);}`);
    settings.dark = 1;
    localStorage.setItem('settings', JSON.stringify(settings));
}

function themeLight(){
    document.querySelector("body").style.background = "white";
    document.querySelector("body").className = "";
    addStyle(``);
    settings.dark = 0;
    localStorage.setItem('settings', JSON.stringify(settings));
}

function resetName(){
    var gameState = JSON.parse(localStorage.getItem('gameState'));
    delete gameState.name;
    localStorage.setItem('gameState', JSON.stringify(gameState));
    location.reload();
}

function writeGameStat(wl){
    if(window.location.pathname.includes("/random")) return;
    if(wl == "w") stats.won++;
    if(wl == "l") stats.streak = -1;
    stats.lastPlayed = day;
    stats.totalPlayed++;
    stats.streak++;
    if(stats.streak>stats.streakBest) stats.streakBest = stats.streak;
    console.log(stats);
    localStorage.setItem('stats', JSON.stringify(stats));
}

function toggleHM(){
    if(settings.hard == 1) {
        settings.hard = 0;
        document.querySelector(".hmtoggle").innerText = "Enable hard mode";
        document.querySelector(".hmtoggle").style.background = "";
    }
    else {
        settings.hard = 1;
        document.querySelector(".hmtoggle").innerText = "Disable hard mode";
        document.querySelector(".hmtoggle").style.background = "#c41313";
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

function toggleCopyMode(){
    if(settings.copy == 1) {
        settings.copy = 0;
        document.querySelector(".sharecopymode").innerText = "Share mode: Default";
    }
    else {
        settings.copy = 1;
        document.querySelector(".sharecopymode").innerText = "Share mode: Clipboard";
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

function toggleShareFormat(){
    if(settings.discord == 1) {
        settings.discord = 0;
        document.querySelector(".shareformat").innerText = "Share format: Default";
    }
    else {
        settings.discord = 1;
        document.querySelector(".shareformat").innerText = "Share format: Discord";
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

function HMCheckValidGuess(){
    if(settings.hard != 1){
        document.querySelector(".enterbtn").click();
        return;
    }
    var greens = {};
    var yellows = [];
    for(var x=1;x<7;x++){
        for(var y=0;y<6;y++){
            try{
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("yellow")) yellows.push(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].innerText);
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("green")) greens[y] = document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].innerText;}
            catch{}
        }
    }
    for(var z=0;z<6;z++){
        if(greens[z]){
            if(document.querySelectorAll(".border-slate-200")[z].innerText != greens[z]) {
                createMsg("" +greens[z] +" must be in position " +(z+1));
                return;
            }
        }
    }
    var guess = "";
    for(var a=0;a<6;a++){
        guess+=document.querySelectorAll(".border-slate-200")[a].innerText;
    }
    for(var b=0;b<6;b++){
        if(yellows[b]){
            if(!guess.includes(yellows[b])){
                createMsg("Word must include " +yellows[b]);
                return;
            }
        }
    }
    document.querySelector(".enterbtn").click();
}

async function createMsg(msg){
    if(document.querySelector(".headsUp")){
        document.querySelector(".headsUp").remove();
    }
    var headsUp = document.createElement("div");
    headsUp.innerHTML = '<div class="fixed top-2.5 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-rose-200 transition ease-in duration-100 opacity-0"><div class="p-4"><p class="text-sm text-center font-medium text-gray-900">' +msg +' </p></div></div>';
    headsUp.classList.add("headsUp");
    document.querySelector(".py-4.max-w-7xl.mx-auto.sm\\:px-6.lg\\:px-8").prepend(headsUp);
    await new Promise(r => setTimeout(r, 50));
    headsUp.children[0].style.opacity = 1;
    await new Promise(r => setTimeout(r, 2000));
    headsUp.children[0].style.opacity = 0;
    await new Promise(r => setTimeout(r, 1000));
    headsUp.remove();
}
