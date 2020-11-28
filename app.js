const app = Vue.createApp({
    data() {
        return {
            name: 'Arinze',
            age:  20,
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Alphonso_mango.jpg/220px-Alphonso_mango.jpg'
        }

    },
    methods: {
        ageinfive (){
           return this.age + 5
        },
        favnumber () {
            return Math.random()
        }
    }
})


app.mount('#assignment')