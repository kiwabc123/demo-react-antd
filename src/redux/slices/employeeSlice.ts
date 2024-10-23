import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmpType } from '../../page/interface/employee';

interface EmployeeState {
    employees: EmpType[];
}

const initialState: EmployeeState = {
    
    employees: (() => {
        const savedEmployees = localStorage.getItem('employees');
        return savedEmployees ? JSON.parse(savedEmployees) : [];
    })(),
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<EmpType>) => {
            state.employees.push(action.payload);
            localStorage.setItem('employees', JSON.stringify(state.employees)); 
        },
        removeEmployee: (state, action: PayloadAction<string>) => {
            const employee = state.employees.find(emp => emp.key === action.payload && !emp.deleted );
            console.log(employee);
            
            if (employee) {
                employee.deleted = true; 
            }
            localStorage.setItem('employees', JSON.stringify(state.employees)); 
        },
        updateEmployee: (state, action: PayloadAction<EmpType>) => {
            const index = state.employees.findIndex(emp => emp.key === action.payload.key);
            if (index !== -1) {
                state.employees[index] = action.payload;
                localStorage.setItem('employees', JSON.stringify(state.employees)); 
            }
        },
    },
});

export const { addEmployee, removeEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
