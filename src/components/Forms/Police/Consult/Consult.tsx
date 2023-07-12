import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import "./ConsultPolicePage.css";


interface Resultat {
    id: number;
    codePolice: string;
    numClient: string;
    raisonSociale: string;
    adresse: string;
    dateEffet: string;
    primeNette: number;
    taxe: number;
    acce: number;
    tauxComm: number;
    dateTerme: string;
    dateEtat: string;
    ff: string;
    mnt_taxe_eve: number;
    mnt_taxe_parafiscale: number;
}
const ConsultPolicePage = () => {
    const { codePolice } = useParams();
    const [numClient, setNumeroClient] = useState('');
    const [nomcommercial, setNomCommercial] = useState('');
    const [ville, setVille] = useState('');
    const [resultats, setResultats] = useState<Resultat | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8081/polices/consult/${codePolice}`)
            .then((response) => response.json())
            .then((data) => {
                setResultats(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [codePolice]);

    return (
        <div className={"consult-card"}>
            <div><h4>Code Police: <p>{resultats?.codePolice}</p></h4></div>
            <div><h4 >Numéro Client: <p>{resultats?.numClient}</p></h4></div>
            <div><h4>Raison Sociale: <p>{resultats?.raisonSociale}</p></h4></div>
            <div><h4>Adresse: <p>{resultats?.adresse}</p></h4></div>


        </div>
    )
}

export default ConsultPolicePage