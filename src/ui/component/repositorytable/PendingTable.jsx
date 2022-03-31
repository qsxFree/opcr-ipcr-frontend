import React from "react";
import { Input,Table,Button, Space, Tag} from 'antd';
import {UploadOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';


const {Search} =Input;


const dataSource = [
  {
    key: 'data1',
    date: '11/19/2022',
    department: <div><Tag color="magenta">Management Information System</Tag></div>,
    name: 'Raymond Zaratar',
    formname: "OPCR-Zaratar",
  },
  
];

const column = [
  {
    title: 'Date Approved',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a,b) => a.name-b.name,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'File Name',
    dataIndex: 'formname',
    key: 'formname',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => (
      <Space size="middle">

        <p><EyeOutlined style={{ cursor: 'pointer' }}/>
        </p>
        <p><DeleteOutlined style={{ cursor: 'pointer' }}/>
        </p>
      
        
      </Space>  )
  
  },

];
//baguhin ang upload button
const PendingTable = () => {
    return (
    <>
        <div className="base-container">

        <Search 
        placeholder="Search"
        style={{width: 250, margin:20 }}
        allowClear/>


      

  
      <Table dataSource={dataSource} columns={column}/>
   


</div>
 </>
 );

}



export default PendingTable