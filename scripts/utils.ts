export interface Appointment {
    appointment: string;
    date: string;
}

export const appointments: Appointment[] = [];

export const addAppointment = (appointment: Appointment ) => {
    appointments.push(appointment)
}