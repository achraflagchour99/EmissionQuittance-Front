import React, { forwardRef } from 'react';
import RMA_WANATNIYA from './RMA_WANATNIYA.jpg';

interface ComponentToPrintProps {
  quittanceData: any; // Replace 'any' with the actual type of quittanceData
}

const ComponentToPrint = forwardRef<HTMLDivElement, ComponentToPrintProps>(
  ({ quittanceData }, ref) => {
    return (
      <div ref={ref} style={{ padding: '1rem', border: '1px solid #000', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '18px' }}>SIEGE SOCIAL  <br />
          83, avenue de l'armée Royale- casablanca -Maroc <br />
          Tél.: 022 31  21  63- 022 31 01  69 - Fax:022 31 38 84-022 31 31 37 <br />
          www.rmawatanya.com
          </div>
          <div style={{ textAlign: 'right' }}>
          <img
          src={RMA_WANATNIYA}
          alt="RMA Wanatniya Logo"
          style={{ position: 'absolute', top: '0', right: '0',  height: '160px' }}
        />
          </div>
        </div>
        
        <h2 style={{ marginTop: '2rem' }}>AVIS D'ECHEANCE</h2>
        
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '1rem' }}>N: {quittanceData.numeroquittance}</div>
          <div>Montant de commission: {quittanceData.montantcommission}</div>
        </div>
        
        <div style={{ marginTop: '1rem', border: '1px solid #000', padding: '0.5rem', borderRadius: '8px' }}>
          {/* Display the additional information here */}
          {/* For example: */}
          <div>Additional information</div>
          <h3>  souscripteur  ou  assuré: </h3>  {quittanceData?.police?.raisonSociale}
          <br />
          <h3> Adresse : </h3>{quittanceData?.police?.adresse} {quittanceData.police?.refVille?.libelle}
         
        </div>

        <div style={{ marginTop: '1rem', border: '1px solid #000', padding: '0.5rem', borderRadius: '8px' }}>
        {/* Display the additional information here */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <p>Agent ou courtier: {quittanceData.police?.intermediaire?.nomCommercial}</p>
            <p>Numero de police: {quittanceData.police?.codePolice}</p>
            </div>
            <div>
            <p>Nom produit: {quittanceData.police?.prdVersioncommerciale.nomcommercial}</p>
            </div>
        </div>
        </div>

        <div style={{ marginTop: '1rem', border: '1px solid #000', padding: '0.5rem', borderRadius: '8px' }}>
        {/* Display the additional information here */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <p>Periode de garantie:</p>
            <p>DU:{(new Date(quittanceData?.datedebut).toLocaleDateString())}</p>
            </div>
            <div>
                <br />
            <p>AU: {(new Date(quittanceData?.datefin).toLocaleDateString())}</p>
            </div>
        </div>
        </div>


        <div style={{ display: 'flex', marginTop: '1rem' }}>
  <div style={{ flex: '1 1 33%', border: '1px solid #000', padding: '0.5rem', borderRadius: '8px' }}>
    {/* First box */}
    <div>
      <h4>Payé le :</h4>
      <div>
        <label>
          <input type="checkbox" /> En espèce
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" /> Par chèque
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" /> Par virement
        </label>
      </div>
      <h4>Sur :</h4>
      <hr />
      <h4>Pour la compagnie</h4>
    </div>
  </div>
  <div style={{ flex: '2 2 66%', border: '1px solid #000', padding: '1rem', borderRadius: '8px', marginLeft: '1rem' }}>
    {/* Second box */}
    <h4>Prime nette :{quittanceData?.police?.primeNette}</h4>
    {/* Add content for Prime nette */}
    <h4>Taxes :{quittanceData?.police?.taxe}</h4>
    {/* Add content for Taxes */}
    <h4>Accessoires :{quittanceData?.police?.acce}</h4>
    {/* Add content for Accessoires */}
    <h4>Total à payer :  {quittanceData?.police?.primeNette + quittanceData?.police?.taxe + quittanceData?.police?.acce}</h4>
    {/* Add content for Total à payer */}
    <p>Bon pour quittance de la somme détaillée ci-dessus</p>
    <p>Émis le : {new Date().toLocaleDateString()}</p>
  </div>
</div>

 
      </div>
    );
  }
);

export default ComponentToPrint;
