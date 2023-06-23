export interface Ville {
    id: number;
    code: string;
    libelle: string;
  }
  
  export interface VersionCom {
    id: number;
    nomcommercial: string;
  }
  
  export interface Interm {
    id: number;
    nomCommercial: string;
  }
  
  export interface Period {
    id: number;
    type_periodicite: string;
  }
  
  export interface EtatPolice {
    id: number;
    libelle: string;
  }
  
  export interface PoliceData {
    id: number;
    codePolice: string;
    numClient: string;
    intermediaire: Interm;
    raisonSociale: string;
    adresse: string;
    dateEffet: Date;
    primeNette: bigint;
    taxe: bigint;
    acce: bigint;
    tauxComm: number;
    dateTerme: Date;
    dateEtat: Date;
    periodicite: Period;
    dateEcheance: Date;
    mnt_taxe_eve: number;
    mnt_taxe_parafiscale: number;
    prdVersioncommerciale: VersionCom;
    refVille: Ville;
    refPolice: EtatPolice;
    terme: string;
  }
  