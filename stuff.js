const arr = {
    jerry: {
        eyes: 'blue',
        hair: 'yellow'
    },
    thomas: {
        eyes: 'red',
        hair: 'orange'
    },
    mary: {
        eyes: 'yellow',
        hair: 'purple'
    }
}

for(let person in arr) {
    console.log(`${arr[person].eyes}`)
}