runGame();
function runGame() {
    var desk = document.querySelector('.desk');
    var buttons = document.querySelectorAll('.cell');
    var piece;
    var index;
    var combinationWin = [];
    var clickedLength = 0;
    var deskStore = {
        X: [],
        O: []
    };
    var winOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    createListeners();
    function createListeners() {
        buttons.forEach(function (button) { return button.addEventListener('click', cellClicked, { once: true }); });
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
        var button = buttons[index];
        var span = button.querySelector('span');
        span.innerHTML = piece;
    }
    function checkGameForWinner() {
        var win = winOptions.filter(function (combination) { return combination.every(function (comb) { return deskStore[piece].includes(comb); }); });
        if (win.length) {
            return setWinner(win);
        }
        checkEndGame();
    }
    function checkEndGame() {
        if (clickedLength == 9) {
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
        combinationWin.forEach(function (cell) {
            var btn = buttons[cell];
            btn.classList.add('cell-winner');
        });
    }
    function removeListeners() {
        buttons.forEach(function (button) { return button.removeEventListener('click', cellClicked, false); });
    }
    function showOverlay() {
        var overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay', 'fa-solid', 'fa-repeat');
        overlayElement.onclick = function () { return reloadGame(); };
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
        buttons.forEach(function (button) {
            var btn = button;
            btn.querySelector('span').innerHTML = '';
            btn.classList.remove('cell-winner');
        });
        runGame();
    }
}
