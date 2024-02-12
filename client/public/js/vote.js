const webSocketClient = new WebSocket('ws://localhost:3000');

const buttonVote = document.querySelector("#voteBtn")
const voteContainer = document.querySelector(".vote")
const results = document.querySelector("#results")
if (buttonVote) {
    buttonVote.addEventListener("click", vote)
}


webSocketClient.onopen = () => {
    console.log('Hello');
};


if (sessionStorage['isVote']) {
    buttonVote.hidden = true;
    voteContainer.innerText = "Вы уже голосовали"
}


async function vote() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert("Выбери уже что-нибудь!!!!")
        return;
    }
    try {
       
        webSocketClient.send(JSON.stringify({item: selected.id}));

        //sessionStorage['isVote'] = true;
        //buttonVote.hidden = true;
    } catch (error) {
        console.error('Ошибка при отправке POST-запроса:', error);
    }


}

function displayResults(data) {
    results.innerHTML = `<div> ${data.optionA.title + ":" + data.optionA.count}</div >
        <div> ${data.optionB.title + ":" + data.optionB.count} </div>`
}

webSocketClient.onmessage = (message) => {
    const data = JSON.parse(message.data);
    displayResults(data)
};

webSocketClient.onclose = () => {
    console.log('By');
};


