runGame();

function runGame() {

    const desk: HTMLElement = document.querySelector('.desk')!;
    const buttons: NodeList = document.querySelectorAll('.cell');
    
    let piece: string;
    let index: number;
    let combinationWin: number[] = [];
    let clickedLength: number = 0;

    interface IdeskStore {
        X: Array<number>;
        O: Array<number>;
    }
    const deskStore: IdeskStore = {
        X: [],
        O: []
    };
    const winOptions: number[][] = [
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

    function createListeners(): void {
        buttons.forEach(button => button.addEventListener('click', cellClicked, { once:true }));
    }

    function cellClicked(): void {
        index = this.dataset.cell;
        saveClicked();
    }

    function saveClicked(): void {
        clickedLength++;
        nextPiece();
        addToDeskStore();
        addXOtoCell();
        checkGameForWinner();
    }

    function nextPiece(): void {
        piece = piece === 'X' ? 'O' : 'X';
    }

    function addToDeskStore(): void {
        deskStore[piece].push(+index);
    }

    function addXOtoCell(): void {
        const button = <Element>buttons[index];
        const span = button.querySelector('span')!;
        span.innerHTML = piece;
    }

    function checkGameForWinner():void {
        const win: number[][] = winOptions.filter(combination => combination.every(comb => deskStore[piece].includes(comb)));
        
        if (win.length) {
            return setWinner(win);
        } 
        
        checkEndGame();
    }

    function checkEndGame(): void {
        if(clickedLength == 9) {
            removeListeners();
            showOverlay();
        }
    }

    function setWinner(win: number[][]): void {
        combinationWin = win[0];
        colorizeWinCells();
        removeListeners();
        showOverlay();
    }

    function colorizeWinCells(): void {
        combinationWin.forEach(cell => {
            let btn = <Element>buttons[cell]
            btn.classList.add('cell-winner')
        });
    }

    function removeListeners(): void {
        buttons.forEach(button => button.removeEventListener('click', cellClicked, false));
    }

    function showOverlay(): void {
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay','fa-solid', 'fa-repeat');
        overlayElement.onclick = () => reloadGame();
        desk.appendChild(overlayElement);
    }

    function reloadGame(): void {
        hideOverlay();
        cleanDesk();
    }

    function hideOverlay(): void {
        desk.removeChild(document.querySelector('.overlay')!);
    }

    function cleanDesk(): void {
        buttons.forEach((button) => {
            let btn: any = <Element>button
            btn.querySelector('span').innerHTML = '';
            btn.classList.remove('cell-winner');
        });
        runGame();
    }

}