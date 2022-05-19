import CrudInterface from "./CrudInterface";

const endpoint = {
  Office: "/office",
  EmployeeProfile: "/employee-profile",
  EmployeeRole: "/employee-role",
  Mfo: "/mfo",
  StrategicPlan: "/strategic-plan",
  User: "/user",
  Period: "/period",
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

export const EmployeeRoleAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.EmployeeRole),
  retrieve: CrudInterface.retrieveFn(endpoint.EmployeeRole),
  create: CrudInterface.createFn(endpoint.EmployeeRole),
  update: CrudInterface.updateFn(endpoint.EmployeeRole),
  remove: CrudInterface.removeFn(endpoint.EmployeeRole),
};

export const MfoAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.Mfo),
  retrieve: CrudInterface.retrieveFn(endpoint.Mfo),
  create: CrudInterface.createFn(endpoint.Mfo),
  update: CrudInterface.updateFn(endpoint.Mfo),
  remove: CrudInterface.removeFn(endpoint.Mfo),
};

export const StrategicPlanAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.StrategicPlan),
  retrieve: CrudInterface.retrieveFn(endpoint.StrategicPlan),
  create: CrudInterface.createFn(endpoint.StrategicPlan),
  update: CrudInterface.updateFn(endpoint.StrategicPlan),
  remove: CrudInterface.removeFn(endpoint.StrategicPlan),

  retrieveToBeApprovedIPCR: CrudInterface.retrieveListFn(
    endpoint.StrategicPlan + "/ipcr"
  ),

  retrieveToBeApprovedOPCR: CrudInterface.retrieveListFn(
    endpoint.StrategicPlan + "/opcr"
  ),
};

export const UserAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.User),
  retrieve: CrudInterface.retrieveFn(endpoint.User),
  create: CrudInterface.createFn(endpoint.User),
  update: CrudInterface.updateFn(endpoint.User),
  remove: CrudInterface.removeFn(endpoint.User),
};

export const PeriodAPI = {
  retrieveList: CrudInterface.retrieveListFn(endpoint.Period),
  retrieve: CrudInterface.retrieveFn(endpoint.Period),
  create: CrudInterface.createFn(endpoint.Period),
  update: CrudInterface.updateFn(endpoint.Period),
  remove: CrudInterface.removeFn(endpoint.Period),
};

const Resource = {
  OfficeAPI,
  EmployeeProfileAPI,
  EmployeeRoleAPI,
  MfoAPI,
  StrategicPlanAPI,
};

export default Resource;
