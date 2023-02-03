import { useState } from 'react'
import Cell from '../Cell/Cell'
import Modal from '../Modal/Modal'
import './Desk.css'

function Desk (props) {
    const cellTotal = 9
    const [deskStore, setDeskStore] = useState({
        X: [],
        O: []
    });
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
    let index;
    let [piece, setPiece] = useState('X');
    let [pieces, setPieces] = useState(Array(cellTotal).fill(''));
    let [clickedLength, setClickedLength] = useState(1);
    let [combinationWin, setCombinationWin] = useState([]);
    let [modal, setModal] = useState(false);

    function cellClicked(i) {
        let newArr = [...pieces];
        newArr[i] = piece;
        setPieces(newArr)
        index = i;
        saveClicked();
    }
    function saveClicked() {
        setClickedLength(clickedLength+1);
        nextPiece();
        addToDeskStore();
        checkGameForWinner();
    }
    function nextPiece() {
        let Lpiece = piece === 'X' ? 'O' : 'X';
        setPiece(Lpiece);
    }
    function addToDeskStore() {
        let obj = {...deskStore};
        obj[piece].push(+index);
        setDeskStore(obj);
    }
    function checkGameForWinner() {
        const win = winOptions.filter(combination => 
                                    combination.every(comb => 
                                        deskStore[piece].includes(comb)
                                    )
                                );
        
        if (win.length) {
            return setWinner(win);
        } 
        
        checkEndGame();
    }
    function setWinner(win) {
        setCombinationWin(win[0]);
        setModal(true);
    }
    function checkEndGame() {
        if(clickedLength == cellTotal) {
            setModal(true);
        }
    }
    function reloadGame() {
        props.reload();
    }

    const cells = [];

    for (let i = 0; i < cellTotal; i++) {
        cells.push(<Cell 
            key={i} 
            piece={pieces[i]} 
            win={combinationWin} 
            data-cell={i} 
            onClick={() => cellClicked(i)}/>)
    }
    
    return (
        <section id="desk">
            <div className="desk">
                {cells}
                <Modal 
                show={modal} 
                onClick={() => reloadGame()}
                />
            </div>
        </section>
    )
}

export default Desk