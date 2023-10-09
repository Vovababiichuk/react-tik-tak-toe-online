const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

function computeWinner(cells) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
         return [a, b, c];
      }
   }
}

function App() {
   const [cells, setCells] = React.useState([null, null, null, null, null, null, null, null, null]);
   const [currentStep, setCurrentStep] = React.useState(SYMBOL_O);
   const [winnerSequence, setWinnerSequence] = React.useState();

   const getSymbolClassName = (item) => {
      if (item === SYMBOL_O) return 'symbol--o';
      if (item === SYMBOL_X) return 'symbol--x';
      return '';
   };

   //! ф-ї які повертають JSX не являються компонентами і зазвичай називають render

   
   const renderSymbol = (item) => {
      return <span className={`symbol ${getSymbolClassName(item)}`}>{item}</span>;
   };

   const renderSymbolTitle = (item) => {
      return <span className={`symbol-title ${getSymbolClassName(item)}`}>{item}</span>;
   };

   const handleCellClick = (index) => {
      if (cells[index]) {
         return;
      }

      const cellsCopy = cells.slice();
      cellsCopy[index] = currentStep;
      const winner = computeWinner(cellsCopy);

      setCells(cellsCopy);
      setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
      setWinnerSequence(winner);
   };

   return (
      <div className="game">
         <div className="game-info">
            <span>Move:</span> {renderSymbolTitle(currentStep)}
         </div>
         <div className="game-field board">
            {cells.map((item, index) => {
               const isWinner = winnerSequence?.includes(index);
               return (
                  <button key={index} className={`cell ${isWinner ? 'cell--win' : ''}`} onClick={() => handleCellClick(index)}>
                     {item ? renderSymbol(item) : null}
                  </button>
               );
            })}
         </div>
      </div>
   );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
