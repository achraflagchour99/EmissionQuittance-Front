export interface QuittancePayload {
    id: number;
    codepolice: string;
    codeclient: string;
    codeintermediaire: string;
    nomclient: string;
    prenomclient: string;
    typequittance: string;  
    ordre: string;
    exercice: string;
    montantcommision: string;
    tauxcommission: string;
    etatquittance: number;
    datedebut: Date;
    datefin: Date;
    dateemission: Date;
    primenette: number;
    tauxtaxe: number;
    montanttaxe: number;
    montantaccessoire: number;
    montantencaisse: number;
    montontremise:number;
    // Add other properties as needed
  }