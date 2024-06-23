export interface Appointment {
    appointment: string;
    date: string;
    status: 'A fazer' | 'Em andamento' | 'Feita';
    points: number;
}

export const appointments: Appointment[] = [];

export const addAppointment = (appointment: Appointment) => {
    appointments.push(appointment);
}

export const getAppointments = () => {
    return [...appointments];
}

export const complete = (index: number) => {
    if(index >= 0 && index < appointments.length) {
        appointments[index].status = 'Feita';
        appointments[index].points = calculatePoints(appointments[index]);
    }
}

const calculatePoints = (appointment: Appointment) => {
    switch (appointment.appointment.length) {
        case 5:
            return 5;
        case 10:
            return 10;
    
        default:
            return 3;
    }
}