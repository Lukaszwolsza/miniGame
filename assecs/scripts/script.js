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

playerName.textContent = prompt("What's your name ? :");
confirm("Are you want to start a game ? Press button");
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const ULT_ATTACK_VALUE = 50;

const maxMonsterHP = 100;
const maxPlayerHP = 100;
let currentMonsterHP = maxMonsterHP;
let currentPlayerHP = maxPlayerHP;
let startNewGame = true;


// function adjustHealtBar(maxLife){
//     monsterHP.max = maxLife;
//     monsterHP.value = maxLife;
//     playerHP.max = maxLife;
//     playerHP.value = maxLife;
// }

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

function damageToBothSite(mode){
    if(mode === "DMG_ON_MONSTER" && playerHP.value > 0){
        const dmgMonster = damageOnMonster(ATTACK_VALUE);
        monsterHP.value -=dmgMonster; 
        if(monsterHP.value <= 0){
            monsterName.textContent = "MONSTER DIED !";
            playerName.textContent = "YOU WON !";
        }
    }else if(mode === "DMG_ON_PLAYER"){
        const dmgOnPlayer = damageOnPlayer(MONSTER_ATTACK_VALUE);
        playerHP.value -=dmgOnPlayer;
        if(playerHP.value <= 0){
            playerName.textContent = "YOU DIED";   
        }
    }else if(mode === "ULT_ON_MONSTER" && playerHP.value > 0){
        if(playerMANA.value > 50){
            const dmgMonster = damageOnMonster(ULT_ATTACK_VALUE);
            monsterHP.value -=dmgMonster;
            playerMANA.value -= 50;
            
            if(monsterHP.value <= 0){
                monsterName.textContent = "MONSTER DIED !";
                playerName.textContent = "YOU WON !";
            }
        }
        
    }
    resetGame();
}

function attackOnMonster(){
    damageToBothSite("DMG_ON_MONSTER");
}
function attackOnPlayer(){
    damageToBothSite("DMG_ON_PLAYER");
}
function ultimatePlayerAttack(){
    damageToBothSite("ULT_ON_MONSTER");
}

//set interval to make dmg on player
const a = setInterval(attackOnMonsterInterval,1500);
function attackOnMonsterInterval(){
    if(monsterHP.value > 0){
        attackOnPlayer();
    }   
}

//regeneration monster hp and mana 
function monsterHPRegeneration(){
    if(monsterHP.value < 100 && monsterMANA.value >= 15 && monsterHP.value > 0){
        monsterHP.value += 5;
        monsterMANA.value -= 15;
    }else if(monsterMANA.value < 30){
        monsterMANA += 20;
    }
}
function playerManaRegeneration(){
    if(playerMANA.value < 100 && playerHP.value > 0 && monsterHP.value){
        playerMANA.value += 10;
    }
}
function healPlayer(){
    if(playerHP.value < 100 && playerMANA.value > 20 && monsterHP.value > 0){
        playerHP.value += 30;
        playerMANA.value -=30;
    }
}


setInterval(monsterHPRegeneration,2000);
setInterval(playerManaRegeneration,2000);


attackBtn.addEventListener("click", attackOnMonster);
ultimateBtn.addEventListener("click", ultimatePlayerAttack);
healBtn.addEventListener("click",healPlayer);

function resetGame(){
    if(playerHP.value <= 0 || monsterHP.value <= 0){
        const doContinued = prompt("Do you want to contiune ?");
        if(doContinued)
        {
            monsterHP.value = 100;
            monsterMANA.value = 100;
            playerHP.value = 100;
            playerMANA.value = 100;
        }
    }
}
