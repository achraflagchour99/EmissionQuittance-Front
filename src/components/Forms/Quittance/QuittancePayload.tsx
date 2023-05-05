import React, {useState} from 'react'; 
 
 interface QuittancePayload {
    quittanceid: number;
    codesociete: number;
    naturequittance: string;
    numeroquittance: string;
    codepolice: string;
    numeroquittanceorigine: string;
    codeclient: string;
    codeintermediaire: number;
    codebranche: number;
    nomclient: string;
    prenomclient: string;
    adresseclient: string;
    typequittance: string;
    primenette: number;
    tauxtaxe: number;
    montanttaxe: number;
    montantaccessoire: number;
    montantencaisse: number;
    montantcommisionretenue: number;
    montantcommisionristourne: number;
    montontremise: number;
    periodicite: string;
    datedebut: Date;
    datefin: Date;
    dateemission: Date;
    etatquittance: string;
    dateetat: Date;
    idoperationprelevement: number;
    idutilisateurristourne: number;
    idutilisateurvalidateur: number;
    idproduit: number;
    tauxcommission: number;
    montantcommission: number;
    synchrone: number;
    datesynchronisation: Date;
    montantcommision: number;
    numeroquittanceOld: number;
    datevalidation: Date;
    montanttaxeparafiscale: number;
    tauxcommissioncatnat: number;
    idquittanceorigine: number;
    typequittanceprevoyance: string;
    forcee: number;
    exercice: string;
    ordre: string;
    villeclient: number;
    intermediaireid: number;
    refQuittanceid: number;
    qtcRemiseid: number;
    habUtilisateurid: number;
    policeid: number;
    dateEcheance: Date;
    dateTerme: Date;
    dateeffet: Date;
  }
  export default QuittancePayload
  