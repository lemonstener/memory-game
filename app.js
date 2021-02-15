const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#end-button');
const endScreen = document.querySelector('#end-screen');
const board = document.querySelector('#board');
const currentScore = document.querySelector('#current-score');


startButton.addEventListener('click', function (e) {
    (e.target).parentElement.style.left = '-100vw';
})


let first = null;
let second = null;
let canClick = true;
let revealed = 0;
let clicks = 0;
let pairs = 0;
let bestScore = JSON.parse(localStorage.getItem("bestScore") || null);

if (bestScore !== null) {
    document.getElementById("best-score").innerText = 'Best Score: ' + bestScore;
}


const cards = [
    'https://i.giphy.com/media/xT1XGLzd2biV4QLWY8/giphy.webp',
    'https://i.giphy.com/media/7E2UMIivAorxEHLuM3/giphy.webp',
    'https://i.giphy.com/media/5QTBj7It7Jt1MTvMM3/giphy.webp',
    'https://i.giphy.com/media/xUPGce1Q9vVEtaAcms/giphy.webp',
    'https://i.giphy.com/media/d1E20yOdFWpgOhuE/giphy.webp',
    'https://i.giphy.com/media/26gslLX5AA4mwZU7m/giphy.webp',
    'https://i.giphy.com/media/26gYCFcNenajfsnVC/giphy.webp',
    'https://i.giphy.com/media/26BGpnv7wFVDmGnny/giphy.webp',
    'https://i.giphy.com/media/l4lR0Q5u91kTNJPsA/giphy.webp',
    'https://i.giphy.com/media/d1E2Zok44O7Rnmik/giphy.webp',
    'https://i.giphy.com/media/xT1XGLzd2biV4QLWY8/giphy.webp',
    'https://i.giphy.com/media/7E2UMIivAorxEHLuM3/giphy.webp',
    'https://i.giphy.com/media/5QTBj7It7Jt1MTvMM3/giphy.webp',
    'https://i.giphy.com/media/xUPGce1Q9vVEtaAcms/giphy.webp',
    'https://i.giphy.com/media/d1E20yOdFWpgOhuE/giphy.webp',
    'https://i.giphy.com/media/26gslLX5AA4mwZU7m/giphy.webp',
    'https://i.giphy.com/media/26gYCFcNenajfsnVC/giphy.webp',
    'https://i.giphy.com/media/26BGpnv7wFVDmGnny/giphy.webp',
    'https://i.giphy.com/media/l4lR0Q5u91kTNJPsA/giphy.webp',
    'https://i.giphy.com/media/d1E2Zok44O7Rnmik/giphy.webp'
]

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

shuffle(cards);


setBoard();

function setBoard() {
    try {
        for (let i = 0; i < 20; i++) {
            document.querySelector('.flip-card').remove();
        }
    } catch { }

    for (let card of cards) {
        let flipCard = document.createElement('div');
        let flipCardInner = document.createElement('div');
        let flipCardFront = document.createElement('div');
        let flipCardBack = document.createElement('div');

        let frontImage = document.createElement('img');
        let backImage = document.createElement('img');

        frontImage.src = 'https://cdn.shopify.com/s/files/1/0267/7447/0691/products/il_fullxfull.1933627505_38kb_grande.jpg?v=1570137725';
        backImage.src = card;
        backImage.className = 'image';
        frontImage.className = 'image';

        flipCard.className = 'flip-card';
        flipCardInner.className = 'flip-card-inner';
        flipCardBack.className = 'flip-card-back';
        flipCardFront.className = 'flip-card-front';

        flipCard.append(flipCardInner);
        flipCardInner.append(flipCardFront);
        flipCardInner.append(flipCardBack);
        flipCardFront.append(frontImage);
        flipCardBack.append(backImage);
        board.append(flipCard)

        frontImage.addEventListener('click', handleCardClick);
    }
}


function handleCardClick(e) {
    if (canClick === false) {
        return;
    }
    let clicked = e.target.parentElement.parentElement;
    revealed++;
    if (revealed === 1) {
        first = clicked;
        clicks++;
        currentScore.innerText = 'Current score ' + clicks;
        clicked.classList.toggle('flipped');
        return;
    }
    if (revealed === 2) {
        second = clicked;
        if (first === second) {
            revealed--;
            second = null;
            return;
        } else {
            clicks++;
            currentScore.innerText = 'Current score: ' + clicks;
            canClick = false;
            clicked.classList.toggle('flipped');
            if (first.children[1].children[0].src === second.children[1].children[0].src) {
                canClick = true;
                first.removeEventListener;
                second.removeEventListener;
                first = null;
                second = null;
                revealed = 0;
                pairs++;
                if (pairs === 10) {
                    endGame();
                }
                return;
            } else {
                setTimeout(function () {
                    canClick = true;
                    first.classList.toggle('flipped');
                    second.classList.toggle('flipped');
                    first = null;
                    second = null;
                    revealed = 0;
                    return;
                }, 1000)
            }
        }
    }

}


restartButton.addEventListener('click', function (e) {
    pairs = 0;
    clicks = 0;
    currentScore.innerText = 'Current score ' + clicks;
    shuffle(cards);
    bestScore = JSON.parse(localStorage.getItem("bestScore"));
    setBoard();
    endScreen.style.left = '-100vw';
})

function endGame() {
    let tally = document.querySelector('#this-score');
    if (bestScore === null) {
        tally.innerText = 'New Personal Best! Your Score : ' + clicks;
        localStorage.setItem("bestScore", clicks);
    } else if (clicks < bestScore) {
        tally.innerText = 'New Personal Best! Your Score : ' + clicks;
        localStorage.setItem("bestScore", clicks);
    } else if (clicks > bestScore) {
        tally.innerText = 'Your score: ' + clicks;
    }
    endScreen.style.left = '10vw';
}

