import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QuittanceAdd from './QuittanceAdd';
import QuittanceGarantie from './QuittanceGarantie';
import { RecoilRoot } from 'recoil';
import SuccessMessage from './QuittanceTerminer';

const steps = ['Informations de la Quittance', 'Informations des Garanties', 'Validation de la Quittance'];

export default function StepperQuittanceAdd() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <QuittanceAdd />;
      case 1:
        return <QuittanceGarantie />;
     case 2: 
       return <SuccessMessage />;
      default:
        return null;
    }
  };

  return (
    <RecoilRoot>
       <Box
        sx={{
          padding: '2rem',
          marginTop: '0.5rem',
          marginBottom:'3rem',
          height: 'auto', // Utilisation de 'auto' pour la hauteur
          backgroundColor: 'white',
          border: 2,
          borderColor: '#a7bcb9',
          justifyContent: 'center',
          marginLeft: '1.8rem',
          marginRight: '2rem',
          borderRadius: '5px',
          boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
        }}
        >
           <Typography marginBottom={"50px"} variant="h5" align="center" color="primary" gutterBottom>
                    Nouvelle Quittance
            </Typography>
  <Box sx={{ paddingBottom: '2rem' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        </Box>
        <div>{getStepContent(activeStep)}</div>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
            
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Retour
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Suivant
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : ' étape compléte'}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </RecoilRoot>
  );
}
