// stats data
const playerName = document.getElementById("playerName");
const monsterHP = document.getElementById("hp-status-monster");
const monsterMANA = document.getElementById("mana-status-monster")
const playerHP = document.getElementById("hp-status-player");
const playerMANA = document.getElementById("mana-status-player");
const monsterName = document.getElementById("monster-info");
//buttons clicks
const attackBtn = document.getElementById("attack-btn");
const ultimateBtn = document.getElementById("ult-btn");
const healBtn = document.getElementById("heal-btn");
const logsBtn = document.getElementById("log-btn");

// playerName.textContent = prompt("What's your name ? :");

const ATTACK_VALUE = 10;
const maxMonsterHP = 100;
let currentMonsterHP = maxMonsterHP;

function adjustHealtBar(maxLife){
    monsterHP.max = maxLife;
    monsterHP.value = maxLife;
    playerHP.max = maxLife;
    playerHP.value = maxLife;
}

function damageOnMonster(damage){
    const dealtDamage = Math.random() * damage;
    monsterHP.value = +monsterHP.value - dealtDamage;
    return dealtDamage;
}
function damageOnPlayer(damage){
    const dealtDamage = Math.random() * damage;
    playerHP.value = +playerHP.value - dealtDamage;
    return dealtDamage;
}
function healMonsterHP(){
    if(monsterHP.value > 0){
        monsterHP.value += 10;  
    }   
}
function attackMonster(){
    const dmgMonster = damageOnMonster(ATTACK_VALUE);
    monsterHP.value -=dmgMonster;
    if(monsterHP.value <= 0){
        monsterName.textContent = "MONSTER DIED !";
    } 
}
function gettingDamageFromMonster(){
    const dmgOnPlayer = damageOnPlayer(ATTACK_VALUE);
    playerHP.value -=dmgOnPlayer;
    if(playerHP.value <= 0){
        playerName.textContent = "YOU DIED";
        
    }
}
function healPlayer(){
    
}
// function losePlayerHP(){
//     do{
//         setInterval(gettingDamageFromMonster,2000);
//     }while(playerHP.value != 0);   
// }
setInterval(healMonsterHP,3000);
setInterval(gettingDamageFromMonster,2000);

attackBtn.addEventListener("click", attackMonster);