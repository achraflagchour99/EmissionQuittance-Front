export const dateFormat = (originalDate: any): string => {
    const formattedDate = new Date(originalDate).toISOString().split("T")[0];
    return formattedDate;
  };



  export const formatDateForTextField=(dateStr: string | number | Date): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
 