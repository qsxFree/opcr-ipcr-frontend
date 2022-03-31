import React from 'react'
import { PageHeader } from 'antd';
import NavigatorContext from '../../../service/context/NavigatorContext';
import ContentTab from "../../component/tabs/ContentTab";
import { useContext } from 'react/cjs/react.development';
import IpcrTable from '../../component/ReviewTableForms/IpcrTable';
import OpcrTable from '../../component/ReviewTableForms/OpcrTable';




const ReviewPmtPage = () => {

const navigatorContext=useContext (NavigatorContext);
navigatorContext.setSelectedKey('reviewForms');

return (
  <>
    <PageHeader title="Forms Review" subTitle="Review OPCR and IPCR Forms"/>
    
    <ContentTab
    
      content={[
        {
          title: "OPCR",
          key: "tab1",
          content:<OpcrTable/>
        },
      
        {
          title: "IPCR",
          key: "tab2",
          content:<IpcrTable/>
        },

    
    ]}
  />
</>
);
};
        
       
 
       

export default ReviewPmtPage