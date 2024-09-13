const baseUrl = 'http://localhost:8080/api/v1';

export const environment = {
  production: false,
  apiUrl: baseUrl,
  employeesUrl: `${baseUrl}/employees`,
  managersUrl: `${baseUrl}/employees/managers`,
  passwordUrl: `${baseUrl}/employees/password`,
  skillsUrl: `${baseUrl}/skills`,
  projectsUrl: `${baseUrl}/projects`,
  loginUrl: `${baseUrl}/auth/login`,
};
