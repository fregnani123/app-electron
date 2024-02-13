
let liData;


const url = 'http://204.216.187.179:3000/findProduto'
fetch(url).then(response => {
    return response.json()
}).then(data => {
    const li = document.querySelector('#liteste')
    liData = data;
    liData.forEach(element => {
    li.textContent = element.nome
    });
console.log(liData)
})


