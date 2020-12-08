function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterHealthBarStyle() {

            if(this.monsterHealth < 0) {

               return { width: 0 + '%' }
            }
           return { width: this.monsterHealth + '%' }
        },
        playerHealthBarStyle() { 

            if(this.playerHealth < 0) {
                
                return { width: 0 + '%' }
            }
           return  { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack () {

            return this.currentRound % 3 !== 0 
    }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'Draw'
                // a draw
            } else if(value <= 0) {

                this.winner = 'Monster'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'Draw'
            } else if(value < 0) {

                this.winner = 'Player'
            }
        }
    },
    methods: {
        startNewGame() {
            this.playerHealth  = 100
            this.monsterHealth = 100
            this.winner        = null
            this.currentRound  = 0
        },
        attackMonster() {

            this.currentRound++;
            const attackValue  = getRandomValue(12, 5)
            this.monsterHealth = this.monsterHealth - attackValue
            this.attackPlayer();

        
        },
        attackPlayer() {

            const attackValue  = getRandomValue(15, 8)
            this.playerHealth  = this.playerHealth - attackValue

            this.healthStatus
        },
        specialAttackMonster() {

            this.currentRound++;
            const attackValue  = getRandomValue(25, 10);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer()
            
            this.healthStatus
        },
        healPlayer() {
            const healValue = getRandomValue(20, 8)
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth = this.playerHealth + healValue
            }

            this.attackPlayer()
        },
        surrender() {
            this.winner = 'Monster'
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({

            })
        }

    }
})

app.mount('#game')