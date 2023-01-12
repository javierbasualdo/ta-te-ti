runGame();

function runGame() {

    const desk: HTMLElement = document.querySelector('.desk')!;
    const buttons: NodeList = document.querySelectorAll('.cell');
    
    let piece: string;
    let index: number;
    let combinationWin: number[] = [];
    let clickedLength: number = 0;

    const deskStore = {
        X: [],
        O: []
    };
    const winOptions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    createListeners();

    function createListeners() {
        buttons.forEach(button => button.addEventListener('click', cellClicked, { once:true }));
    }

    function cellClicked() {
        index = this.dataset.cell;
        saveClicked();
    }

    function saveClicked() {
        clickedLength++;
        nextPiece();
        addToDeskStore();
        addXOtoCell();
        checkGameForWinner();
    }

    function nextPiece() {
        piece = piece === 'X' ? 'O' : 'X';
    }

    function addToDeskStore() {
        deskStore[piece].push(+index);
    }

    function addXOtoCell() {
        const button = buttons[index];
        const span = button.querySelector('span');
        span.innerHTML = piece;
    }

    function checkGameForWinner() {
        const win = winOptions.filter(combination => combination.every(comb => deskStore[piece].includes(comb)));
        
        if (win.length) {
            return setWinner(win);
        } 
        
        checkEndGame();
    }

    function checkEndGame() {
        if(clickedLength == 9) {
            removeListeners();
            showOverlay();
        }
    }

    function setWinner(win) {
        combinationWin = win[0];
        colorizeWinCells();
        removeListeners();
        showOverlay();
    }

    function colorizeWinCells() {
        combinationWin.forEach(cell => buttons[cell].classList.add('cell-winner'));
    }

    function removeListeners() {
        buttons.forEach(button => button.removeEventListener('click', cellClicked, { once:true }));
    }

    function showOverlay() {
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay','fa-solid', 'fa-repeat');
        overlayElement.onclick = () => reloadGame();
        desk.appendChild(overlayElement);
    }

    function reloadGame() {
        hideOverlay();
        cleanDesk();
    }

    function hideOverlay() {
        desk.removeChild(document.querySelector('.overlay'));
    }

    function cleanDesk() {
        buttons.forEach(button => {
            button.querySelector('span').innerHTML = '';
            button.classList.remove('cell-winner');
        });
        runGame();
    }

}