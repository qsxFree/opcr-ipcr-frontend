import {
  HomeOutlined,
  FileAddOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  FolderOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons/lib/icons";

const navigations = [
  {
    id: 1,
    uKey: "home", //unique readable key
    name: "Home",
    basePath: "/home",
    icon: <HomeOutlined />,
  },
  {
    id: 10,
    uKey: "general", //unique readable key
    name: "General",
    basePath: "/general",
    icon: <DeploymentUnitOutlined />,
  },

  {
    id: 2,
    uKey: "strategicPlan", //unique readable key
    name: "Strategic Plan",
    basePath: "/strategicplan",
    icon: <FolderOutlined />,
  },
  {
    id: 3,
    uKey: "operationalPlan", //unique readable key
    name: "Operational Plan",
    basePath: "/operationalplan",
    icon: <FolderOutlined />,
  },
  {
    id: 4,
    uKey: "mediumdevGoals", //unique readable key
    name: "Development Goals",
    basePath: "/mediumdevgoals",
    icon: <FolderOutlined />,
  },
  /* {
    id: 4,
    uKey: "forms", //unique readable key
    name: "Forms",
    basePath: null,
    icon: <FolderAddOutlined /> ,

    sub: [
      {
        id: 5,
        uKey: "fileopcr", //unique readable key
        name: "OPCR",
        basePath: "/forms/fileopcr",
        
      },
      {
        id:6 ,
        uKey: "fileipcr", //unique readable key
        name: "IPCR",
        basePath: "/forms/fileipcr",
        
      },
    ],
  },*/
  // {
  //   id: 5,
  //   uKey: "createOpcr", //unique readable key
  //   name: "Create OPCR",
  //   basePath: "/createopcr",
  //   icon: <FileAddOutlined />,
  // },
  // {
  //   id: 8,
  //   uKey: "createIpcr", //unique readable key
  //   name: "Create IPCR",
  //   basePath: "/createipcr",
  //   icon: <FileAddOutlined />,
  // },
  {
    id: 6,
    uKey: "ipcrForms", //unique readable key
    name: "IPCR Forms",
    basePath: "/ipcrforms",
    icon: <FileTextOutlined />,
  },
  {
    id: 7,
    uKey: "Repository", //unique readable key
    name: "Repository",
    basePath: "/repository",
    icon: <DatabaseOutlined />,
  },

  {
    id: 9,
    uKey: "reviewForms", //unique readable key
    name: "Review Forms",
    basePath: "/reviewform",
    icon: <FolderOutlined />,
  },

  //Add more navigations here
];

export default navigations;
