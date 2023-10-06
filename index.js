const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

function App() {
   const cells = [SYMBOL_O, null, SYMBOL_X, SYMBOL_O, SYMBOL_X, SYMBOL_O, null, null, null];

   const currentStep = SYMBOL_O;

   const getSymbolClassName = (item) => {
      if (item === SYMBOL_O) return 'symbol--o';
      if (item === SYMBOL_X) return 'symbol--x';
      return '';
   };

   //! ф-ї які повертають JSX не являються компонентами і зазвичай називають render
   const renderSymbol = (item) => {
      return <span className={`symbol ${getSymbolClassName(item)}`}>{item}</span>;
   };

   return (
      <div className="game">
         <div className="game-info">Move: {renderSymbol(currentStep)}</div>
         <div className="game-field board">
            {cells.map((item, index) => {
               return (
                  <button key={index} className="cell">
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
