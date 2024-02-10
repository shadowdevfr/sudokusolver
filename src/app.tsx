import { useEffect, useRef, useState } from "preact/hooks"
import * as SH from './sudokuHelper';
import { highlightSignal, vitesseSignal } from "./Signals";

const GRILLE_DEFAULT = [[0, 1, 0, 0, 7, 8, 0, 0, 0], [0, 8, 0, 0, 4, 0, 9, 0, 0], [0, 0, 5, 6, 0, 0, 0, 1, 0], [1, 0, 0, 0, 6, 0, 0, 0, 5], [0, 4, 0, 9, 1, 5, 0, 7, 2], [0, 6, 7, 0, 8, 0, 4, 0, 0], [0, 0, 0, 3, 0, 0, 1, 0, 0], [0, 7, 0, 8, 9, 0, 0, 2, 3], [0, 0, 0, 0, 0, 4, 0, 0, 0]];

export function App() {
  const [grille, setGrille] = useState(GRILLE_DEFAULT);
  const [grilleBase, setGrilleBase] = useState(GRILLE_DEFAULT);
  const [enCours, setEnCours] = useState(false);
  const grilleInputRef = useRef();
  return (
    <div class='p-5 w-full h-full flex flex-col items-center gap-10'>
      <h1 class='font-bold text-2xl'>Backtracking : résolution d'un Sudoku</h1>

      <div class='flex gap-10 justify-center w-2/3'>
        <div class='flex flex-col border-r-2 border-r-red-500 border-b-2 border-b-red-500'> 
          {grille.map((l, x) => (<>
            <div class={`grid grid-cols-9 text-2xl ${x%3 == 0 ? 'border-t-red-500 border-t-2' : ''}`}>
              {l.map((c, y) => (
                <p class={` p-5 px-8 border-[1px] ${highlightSignal.value.y == y && highlightSignal.value.x == x ? 'bg-green-500' : c > 0 ? 'bg-slate-200' : 'bg-slate-400'}  border-slate-500 ${y%3 == 0 ? 'border-l-red-500 border-l-2' : ''}`}>{c}</p>
              ))}
            </div>
          </>))}
        </div>

        <div class='flex gap-10 h-full w-1/3 items-center'>
          <div class='flex flex-col gap-2'>
            <input type='range' min='0' max='1000' value={vitesseSignal.value} onInput={(e) => {
              // @ts-ignore
              vitesseSignal.value = e.target.value;
            }}/>
            <textarea ref={grilleInputRef} class='w-full h-96 border-slate-400 border-[1px] shadow rounded-md bg-slate-100' value={JSON.stringify(grilleBase)} onInput={(e) => {
              // @ts-ignore 
              setGrilleBase(JSON.parse(e.target.value));
            }}></textarea>
            
            {!enCours ? <button class='border-green-600 border-[1px] bg-green-500 shadow rounded-md font-bold hover:scale-105 transition' onClick={() => {
              setEnCours(true);
              setGrille(grilleBase);
              SH.resoudre(setGrille, JSON.parse(JSON.stringify(grille)), 0, 0).then(() => setEnCours(false));
            }}>Résoudre</button>
            : <button class='border-green-600 border-[1px] bg-green-500 shadow rounded-md font-bold cursor-not-allowed opacity-50'>Résoudre</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
