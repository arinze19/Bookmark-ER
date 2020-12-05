const app = Vue.createApp({
    data() {
        return {
            task: '',
            taskList: [],
            display: true
        }
    },
    methods: {
        displayList() {
           return this.display = !this.display
        },
        addTask() {
            this.taskList.push(this.task)
            this.task = ''
        }
    },
    computed: {
        buttonDisplay() {
            return this.display ? 'Hide List' : 'Show List'
        }
    }
})


app.mount('#assignment')


