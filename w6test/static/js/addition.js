(function() {
    'use strict';
    var loopy = setInterval(() => {
        try{
        if(document.querySelector(".text-sm").textContent.startsWith("You lost")){
            var lostword = document.querySelector(".text-sm").textContent.slice(23);
            document.querySelector('div[style="user-select: none;"]').style.display = "none";
            var displayword = document.createElement("p");
            displayword.innerText = lostword;
            displayword.style = "text-align: center; display: block; margin: auto; color: #007cff; font-weight: bold; font-size: 20px; border: dashed #007cff 2px; width: 100px; border-radius: 20px; padding-bottom: 3px;";
            document.querySelector(".pb-6").appendChild(displayword);
            var lostsharebutton = document.createElement("button");
            lostsharebutton.className = "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded bg-slate-400 text-white border-slate-400";
            lostsharebutton.innerText = "SHARE";
            lostsharebutton.style = "margin: auto; margin-top: auto; margin-top: auto; width: 100px; margin-top: 10px;";
            lostsharebutton.addEventListener("click", shareOrCopy, false);
            document.querySelector(".pb-6").appendChild(lostsharebutton);
            console.log("ok 1");
            clearInterval(loopy);
        }}
        catch{}
    }, 500);
})();

function shareOrCopy(){
    console.log("ok 2");
    var start = new Date(2022, 0, 1);
    var now = Date.now();
    var day = Math.floor((now - start) / 86400000);
    var gamestate = "wordle6.com " +day +" X/6\n\n";
    for(var x=1;x<7;x++){
        for(var y=0;y<6;y++){
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("slate")) gamestate+="⬜";
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("yellow")) gamestate+="🟨";
            if(document.querySelector(".pb-6 > div:nth-child(" +x +")").children[y].className.includes("green")) gamestate+="🟩";
        }
        gamestate+="\n";
    }
    navigator.share ? navigator.share({text: gamestate}) : (navigator.clipboard.writeText(gamestate) ? document.querySelector("button.w-14").innerText = "COPIED" : 0);
}
