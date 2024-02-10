import { highlightSignal, limitationVitesse, vitesseSignal } from "./Signals";

const ligne = (S: number[][], i: number) => S[i].filter((n) => n >= 1);

const colonne = (S: number[][], j: number) => S.map((l) => l[j]).filter((n) => n >= 1);

const bloc = (S: number[][], i: number, j: number): number[] => {
    let bloc_i = Math.floor(i / 3) * 3;
    let bloc_j = Math.floor(j / 3) * 3;

    let r = [];
    for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
            if (S[bloc_i + m][bloc_j + n] >= 1) r.push(S[bloc_i + m][bloc_j + n]);
        }
    }
    return r;
}

const possibles = (S: number[][], i: number, j: number): number[] => {
    let r = [];
    for (let n = 1; n < 10; n++) {
        if (![...ligne(S, i), ...colonne(S, j), ...bloc(S, i, j)].includes(n)) {
            r.push(n); 
        }
    }
    return r;
}

const suivante = (l:number, c:number) => c+1>=9 ? {l: l+1, c: 0} : {l: l, c: c+1};

const resoudre = async (setGrille: any, S: number[][], i: number = 0, j: number = 0): Promise<Boolean> => {
    if (limitationVitesse.value) await new Promise(r => setTimeout(r, vitesseSignal.value));
    if (i == 9) return true
    highlightSignal.value = {x: i, y: j};
    if (S[i][j] > 0) {
        let {l, c} = suivante(i,j);
        return await resoudre(setGrille, S, l, c);
    }
    for (let k of possibles(S, i, j)) {
        S[i][j] = k;
        setGrille(S);
        let {l, c} = suivante(i,j);
        if (await resoudre(setGrille, S, l, c)) return true;
    }
    S[i][j] = 0;
    setGrille(S);
    return false;
}


export {ligne, colonne, bloc, possibles, suivante, resoudre}