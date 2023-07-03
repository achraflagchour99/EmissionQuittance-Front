
import axios from 'axios';
import React from 'react';
import { Ville, VersionCom, Interm, Period, EtatPolice, TypeTerme } from '../Types/types';
import config from '../../../../../config/config';

export const fetchVilles = async (setVilles: React.Dispatch<React.SetStateAction<Ville[]>>) => {
    try {
      const response = await axios.get<any[]>(`${config.apiUrl}/villes`);
      const villesData: Ville[] = response.data;
      setVilles(villesData);
      const villes = villesData.map((ville) => ville.libelle);
    } catch (error) {
      console.error(error);
    }
  };
    export const fetchVersions = async (setVersions: React.Dispatch<React.SetStateAction<VersionCom[]>>) => {
      try {
          const response = await axios.get<any[]>(`${config.apiUrl}/versioncom/all`);
          const versionsData: VersionCom[] = response.data;
          setVersions(versionsData)
          const versionscomm = versionsData.map((ver) => ver.nomcommercial);
      } catch (error) {
          console.error(error);
      }
  };
  export const fetchInterm = async (setIntermediaires: React.Dispatch<React.SetStateAction<Interm[]>>) => {
      try {
          const response = await axios.get<any[]>(`${config.apiUrl}/intermediaires`);
          const intermData: Interm[] = response.data;
          setIntermediaires(intermData)
          const intermediaires = intermData.map((inter) => inter.nomCommercial);
      } catch (error) {
          console.error(error);
      }
  };
  export  const fetchPeriodes = async(setPeriodicites: React.Dispatch<React.SetStateAction<Period[]>>) => {
      try {
          const response = await axios.get<any[]>(`${config.apiUrl}/periodes`);
          const periodesData: Period[] = response.data;
          setPeriodicites(periodesData)
          const periodes = periodesData.map((p) => p.type_periodicite);
      } catch (error) {
          console.error(error);
      }
  };
  export const fetchEtats = async (setEtats: React.Dispatch<React.SetStateAction<EtatPolice[]>>) => {
      try {
          const response = await axios.get<any[]>(`${config.apiUrl}/polices/etats`);
          const etatsData: EtatPolice[] = response.data;
          setEtats(etatsData)
          const etats = etatsData.map((e) => e.libelle);
      } catch (error) {
          console.error(error);
      }
  };
  export const fetchTypesTermes = async (setTypesTerme: React.Dispatch<React.SetStateAction<TypeTerme[]>>) => {
    try {
        const response = await axios.get<any[]>('http://localhost:8081/termes');
        const typesData: TypeTerme[] = response.data;
        setTypesTerme(typesData)
        const etats = typesData.map((e) => e.terme);
    } catch (error) {
        console.error(error);
    }
};