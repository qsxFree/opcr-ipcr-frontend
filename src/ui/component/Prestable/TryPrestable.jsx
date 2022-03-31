import React, { useState } from 'react';
import { Modal, Button,Input,Drawer} from 'antd';
import FormAddMfo from '../FormAddMfo/FormAddMfo';
//import { ExclamationCircleOutlined } from '@ant-design/icons';


//modal ito

const {Search} =Input;

const TryPrestable = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }
  
  return (
    <>
    <Search 
        placeholder="Search"
        style={{width: 200, margin:20 }}
        allowClear/>
      
      <>
      <Button style={{margin:20, float:"right"}}type="primary" onClick={showModal}>
        + Add Strategic Plan
      </Button>
      <Modal style={{width:200}}title="Add CNSC Strategic Plan " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        
        <FormAddMfo/>
        
      </Modal>
    

      
    </>
</>
  );
};

export default TryPrestable