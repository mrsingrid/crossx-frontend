export interface User {
  id: number;
  name: string;
  road: string;
  number: number;
  district: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  enrollment: Enrollment | null;
  payment: Payment | null;
}

export interface Enrollment {
  id: number;
  user_id: number;
  name: string;
  registration_date: string;
  due_date: string;
  inactive_date: any;
}

export interface Payment {
  id: number;
  enrollment_id: number;
  value: string;
  type: string;
  payment_date: string;
}

export interface ResponsePayments {
  payments: payments[];
}
