export interface RegistrationData {
  firstName: string;
  lastName: string;
  mobile: string;
  gender: string;
  email?: string;
  dateOfBirth?: string;
  expectedDateOfBirth?: string;
  subject?: string;
  currentAddress?: string;
  hobbies?: string[];
  state?: string;
  city?: string;
}

export const registrationData: Record<string, RegistrationData> = {
  validUser: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "0991234568",
    dateOfBirth: "15 Jan 2000",
    expectedDateOfBirth: "15 January,2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  mandatoryFieldsOnly: {
    firstName: "Leandro",
    lastName: "Souto",
    mobile: "0991234568",
    gender: "Female",
  },

  userTest1: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "0991234568",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports", "Reading"],
    state: "NCR",
    city: "Delhi",
  },

  missingFirstName: {
    firstName: "",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "0991234565",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  missingLastName: {
    firstName: "Leandro",
    lastName: "",
    email: "leandro@test.com",
    mobile: "0991234565",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  missingMobile: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  mobileWithLetters: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "abcdefghij",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  mobileInvalidFormat: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "123456",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  invalidEmail: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "lea@",
    mobile: "123456",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "Male",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },

  missingGender: {
    firstName: "Leandro",
    lastName: "Souto",
    email: "leandro@test.com",
    mobile: "1234567891",
    dateOfBirth: "15 Jan 2000",
    subject: "Maths",
    currentAddress: "Montevideo",
    gender: "",
    hobbies: ["Sports"],
    state: "NCR",
    city: "Delhi",
  },
};
