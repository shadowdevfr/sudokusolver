  import { useEffect, useRef, useState } from "preact/hooks"
import * as SH from './sudokuHelper';
import { highlightSignal, limitationVitesse, vitesseSignal } from "./Signals";
import problemes from './problemes.json';

const GRILLE_DEFAULT = [[0, 1, 0, 0, 7, 8, 0, 0, 0], [0, 8, 0, 0, 4, 0, 9, 0, 0], [0, 0, 5, 6, 0, 0, 0, 1, 0], [1, 0, 0, 0, 6, 0, 0, 0, 5], [0, 4, 0, 9, 1, 5, 0, 7, 2], [0, 6, 7, 0, 8, 0, 4, 0, 0], [0, 0, 0, 3, 0, 0, 1, 0, 0], [0, 7, 0, 8, 9, 0, 0, 2, 3], [0, 0, 0, 0, 0, 4, 0, 0, 0]];

export function App() {
  const [grille, setGrille] = useState(GRILLE_DEFAULT);
  const [grilleBase, setGrilleBase] = useState(GRILLE_DEFAULT);
  const [enCours, setEnCours] = useState(false);
  const grilleInputRef = useRef();
  return (
    <div class='p-5 w-full h-full flex flex-col items-center gap-10'>
      <h1 class='font-bold text-2xl'>Backtracking : résolution d'un Sudoku</h1>

      <div class='flex gap-10 justify-center flex-wrap sm:flex-nowrap'>
        <div class='flex flex-col w-full border-r-2 border-r-slate-800 h-max w-max border-b-2 border-b-slate-800'> 
          {grille.map((l, x) => (<>
            <div class={`grid grid-cols-9 w-max ${x%3 == 0 ? 'border-t-slate-800 border-t-2' : ''}`}>
              {l.map((c, y) => (
                <div class='relative'>
                  {highlightSignal.value.y == y && highlightSignal.value.x == x ? <div class='flex justify-center items-center'><img src='/arrow.png' class='absolute text-center w-8' /></div> :<></>}
                  <p class={`w-8 h-8 md:w-12 md:h-12 xl:h-16 text-sm md:text-xl xl:text-2xl xl:w-16 flex items-center justify-center border-[1px] ${highlightSignal.value.y == y && highlightSignal.value.x == x ? 'bg-green-500' : c > 0 ? 'bg-slate-200' : 'bg-slate-400'}  border-slate-500 ${y%3 == 0 ? 'border-l-slate-800 border-l-2' : ''}`}>{c}</p>
                </div>
              ))}
            </div>
          </>))}
        </div>

        <div class='flex gap-10 h-full w-full justify-center sm:w-1/3 items-center'>
          <div class='flex flex-col gap-2'>
            <input type='range' min='0' max='200' value={vitesseSignal.value} onInput={(e) => {
              // @ts-ignore
              vitesseSignal.value = e.target.value;
            }}/>

            <div class='flex gap-2 items-center'>
              <input type={'checkbox'} checked={limitationVitesse.value} onChange={(e) => limitationVitesse.value = JSON.parse(e.target.checked)}>s</input>
              <div class='flex flex-col'>
              <p>Limiter la vitesse?</p>
              <p class='text-gray-500 text-xs'>Recommendé</p>
              </div>
            </div>

            <textarea ref={grilleInputRef} class='w-full h-96 border-slate-400 border-[1px] shadow rounded-md bg-slate-100' value={JSON.stringify(grilleBase)} onInput={(e) => {
              // @ts-ignore 
              setGrilleBase(JSON.parse(e.target.value));
              setGrille(grilleBase);

            }}></textarea>
            <button class='border-orange-600 border-[1px] bg-orange-500 shadow rounded-md font-bold hover:scale-105 transition' onClick={() => {
              // @ts-ignore
              setGrille(problemes[Math.floor(Math.random()*(problemes.length-1))]);
              setGrilleBase(JSON.parse(JSON.stringify(grille)));
            }}>Problème aléatoire</button>
            {!enCours ? <button class='border-green-600 border-[1px] bg-green-500 shadow rounded-md font-bold hover:scale-105 transition' onClick={() => {
              setEnCours(true);
              SH.resoudre(setGrille, JSON.parse(JSON.stringify(grille)), 0, 0).then(() => setEnCours(false));
            }}>Résoudre</button>
            : <button class='border-green-600 border-[1px] bg-green-500 shadow rounded-md font-bold cursor-not-allowed opacity-50'>Résoudre</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
