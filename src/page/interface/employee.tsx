export interface EmpType {
    title :"Mr." | "Mrs." | "Miss"
    key: string;               
    firstname: string;         
    lastname: string;          
    birthday: Date;           
    nationality: string;       
    citizenID: string;         
    gender: 'Male' | 'Female' | 'Unisex';  
    mobilePhone: string;       
    passportNo: string;        
    expectedSalary: number;    
    deleted:boolean
}
