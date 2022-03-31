import React from 'react'
import { Button, PageHeader } from 'antd';
import NavigatorContext from '../../../service/context/NavigatorContext';
import ContentTab from "../../component/tabs/ContentTab";
import { useContext } from 'react/cjs/react.development';
import ApproveTable from '../../component/repositorytable/ApproveTable';
import RateTable from '../../component/repositorytable/RateTable';
import PendingTable from '../../component/repositorytable/PendingTable';




const Repository = () => {

const navigatorContext=useContext (NavigatorContext);
navigatorContext.setSelectedKey('Repository');
 
return (
  <>
    <PageHeader title="Repository/Storagesss  " subTitle="OPCR/IPCR" />
    <ContentTab
      content={[
        {
          title: "Approved Forms",
          key: "AForms",
          content:<ApproveTable/>
        },
      
        {
          title: "Rated Forms",
          key: "RForms",
          content: <RateTable/>
        },
        {
          title: "Pending Forms",
          key: "PForms",
          content:<PendingTable/>
        },

    
    ]}
  />
</>
);
};
        
       
 
       

export default Repository