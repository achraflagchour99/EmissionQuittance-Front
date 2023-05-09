import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import ConsultPolicePage from "../../pages/ConsultPolicePage";
import SearchPolice from "./SearchPolice";

interface PoliceData {
    id: number;
    codePolice: string;
    numClient: string;
    raisonSociale: string;
    adresse: string;
}

const AddPolice: React.FC = () => {
    const [policeData, setPoliceData] = useState<PoliceData>({
        id: 0,
        codePolice: '',
        numClient: '',
        raisonSociale: '',
        adresse: ''
    });
    const [createdPoliceCodePolice, setCreatedPoliceCodePolice] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPoliceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8081/polices/add',
                policeData
            );
            // Redirect to the PoliceDetails component with the codePolice as a parameter
            window.location.href = `/consult-page/${response.data.codePolice}`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <TextField
                name="id"
                label="ID"
                value={policeData.id}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="codePolice"
                label="Code Police"
                value={policeData.codePolice}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="numClient"
                label="Num Client"
                value={policeData.numClient}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="raisonSociale"
                label="Raison Sociale"
                value={policeData.raisonSociale}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="adresse"
                label="Adresse"
                value={policeData.adresse}
                onChange={handleChange}
                fullWidth
            />
                <Button type="submit" variant="contained" color="primary">
                Ajouter
                </Button>
        </form>
        </div>
    );
};

export default AddPolice;
