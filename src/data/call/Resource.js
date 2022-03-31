import CrudInterface from "./CrudInterface";

const endpoint = {
  Office: "/office",
  EmployeeProfile: "/employee-profile",
};

export const OfficeAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.Office),
  retrieve: CrudInterface.retrieveFn(endpoint.Office),
  create: CrudInterface.createFn(endpoint.Office),
  update: CrudInterface.updateFn(endpoint.Office),
  remove: CrudInterface.removeFn(endpoint.Office),
};

export const EmployeeProfileAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.EmployeeProfile),
  retrieve: CrudInterface.retrieveFn(endpoint.EmployeeProfile),
  create: CrudInterface.createFn(endpoint.EmployeeProfile),
  update: CrudInterface.updateFn(endpoint.EmployeeProfile),
  remove: CrudInterface.removeFn(endpoint.EmployeeProfile),
};

const Resource = {
  OfficeAPI,
  EmployeeProfileAPI,
};

export default Resource;
