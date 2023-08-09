export const ModificationstatusQuittance = async (status: any = false) => {
    const modifiedStatus = status !== null && status !== undefined ? true : false;
    localStorage.setItem('statusQuittance', JSON.stringify(modifiedStatus));
  };
  


  export const ModificationstatusGarantieQuittance = async (status: any = false) => {
    const modifiedStatus = status !== null && status !== undefined ? true : false;
    localStorage.setItem('statusGarantieQuittance', JSON.stringify(modifiedStatus));
  };
  
