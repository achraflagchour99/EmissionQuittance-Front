import React, {useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import {Box, tableCellClasses} from "@mui/material"; 
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Button, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {styled} from "@mui/material/styles";
import QuittancePayload from './QuittancePayload'; 
import { submitForm } from './ServiceQuittance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddQuittance() {

  const [formData, setFormData] = useState({
    policeId: '',
    intermediaireId: '',
    dateEmission: '',
    dateEtat: '',
    refQuittanceId: '',
    dateDebut: '',
    dateFin: '',
    tauxTaxe: '',
    tauxCommission: '',
    montantRemise: '',
    qtcRemiseId: '',

    quittanceid: 0,
    codesociete: 0,
    naturequittance: 'string',
    numeroquittance: 'string',
    codepolice: 'string',
    numeroquittanceorigine: 'string',
    codeclient: 'string',
    codeintermediaire: 0,
    adresseclient: 'string', 
    primenette: 100,   
    datedebut: '2023-05-04T13:17:41.016Z',
    datefin:'2024-05-04T13:17:41.016Z',
    dateemission: '2023-05-04T13:17:41.016Z',
    etatquittance: 'string',
    dateetat:  '2023-05-04T13:17:41.016Z', 
    tauxcommission: 25,
    montantcommission: 0,   
    datevalidation: '2023-05-04T13:17:41.016Z', 
    exercice: '258',
    ordre: '369',
    villeclient: 2,
    intermediaireid: 8,
    refQuittanceid: 2,
    qtcRemiseid: 1,
    habUtilisateurid: 1,
    policeid: 3,
    dateEcheance: '2024-05-04T13:17:41.016Z',
    dateTerme: '2022-05-04T13:17:41.016Z',
    dateeffet: '2022-05-04T13:17:41.016Z',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await submitForm(formData);
     // console.log('Form submitted:', response);
      // Afficher le toast en cas de succès
      if (response) {
        // Afficher le toast en cas de succès
        toast.success('Form submitted successfully!');
      } else {
        // Afficher le toast d'erreur si la réponse est vide
        toast.error('Error response! '+response);
      }


    } catch (error) {
      console.error('Form submission error:', error);
      // Afficher le toast d'erreur en cas d'échec
      toast.error('An error occurred while submitting the form!');
    }
  };
 
  return (
    <div className="mx-5 px-3">
      <h3>Formulaire</h3>
      <hr />

      <Form onSubmit={handleSubmit}>
      <h4>Première partie</h4>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Police ID</Form.Label>
              <Form.Control type="number" name="policeId" value={formData.policeId} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Intermédiaire ID</Form.Label>
              <Form.Control type="number" name="intermediaireId" value={formData.intermediaireId} onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Date d'émission</Form.Label>
              <Form.Control type="date" name="dateEmission" value={formData.dateEmission} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Date d'état</Form.Label>
              <Form.Control type="date" name="dateEtat" value={formData.dateEtat} onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Ref Quittance ID</Form.Label>
              <Form.Control type="number" name="refQuittanceId" value={formData.refQuittanceId} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Date début</Form.Label>
              <Form.Control type="date" name="dateDebut" value={formData.dateDebut} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Date fin</Form.Label>
              <Form.Control type="date"   value={formData.dateFin} onChange={handleInputChange}/>
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <h4>Deuxième partie</h4>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Taux de taxe</Form.Label>
              <Form.Control type="number" value={formData.tauxTaxe} onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Taux de commission</Form.Label>
              <Form.Control type="number"  value={formData.tauxCommission} onChange={handleInputChange}/>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">Montant de remise</Form.Label>
              <Form.Control type="number"  value={formData.montantRemise} onChange={handleInputChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="font-weight-bold">QTC Remise ID</Form.Label>
              <Form.Control type="number"  value={formData.qtcRemiseId} onChange={handleInputChange}/>
            </Form.Group>
          </Col>
        </Row>

        <Button type ="submit"variant="success" className="float-right">
          Enregistrer
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
  }

export default AddQuittance