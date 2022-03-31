import React  from "react";
import { Input,Table,Button, Upload, Space, Tag} from 'antd';
import { UploadOutlined, EyeOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

const props = {
 
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  }
};

const {Search} =Input;

const dataSource = [
  {
    key: 'data1',
    date: '11/19/2022',
    department: <div><Tag color="magenta">Management Information System</Tag></div>,
    name: 'Raymond Zaratar',
    formname: "OPCR-Zaratar",
  },
  {
    key: 'data2',
    date: '11/23/2022',
    department:<div><Tag color="magenta">Management Information System</Tag></div>,
    name: 'Raymond Zaratar',
    formname: "OPCR-Zaratar",
  },
  {
    key: 'data2',
    date: '11/23/2022',
    department:<div><Tag color="magenta">Management Information System</Tag></div>,
    name: 'Raymond Zaratar',
    formname: "OPCR-Zaratar",
  },
  {
    key: 'data2',
    date: '11/23/2022',
    department:<div><Tag color="magenta">Management Information System</Tag></div>,
    name: 'Raymond Zaratar',
    formname: "OPCR-Zaratar",
  },
 
];

const column = [
  {
    title: 'Date Rated',
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
    title: 'FormName',
    dataIndex: 'formname',
    key: 'formname',
  }, 
  {
    title: 'Action',
    dataIndex: 'formname',
    render: () => (
      <Space size="middle">

        <p><EyeOutlined style={{ cursor: 'pointer' }}/>
        </p>
        <p><DeleteOutlined style ={{cursor: 'pointer'}}/>
        </p>
      
        
      </Space>  )
  
  
  },

];
//baguhin ang upload button
const RateTable = () => {
    return (
    <>
        <div className="base-container">
        <Search 
        placeholder="Search"
        style={{width: 250, margin:20 }}
        allowClear/>

<Button type = "primary"  style={{ float:'right',margin:20 }} icon={<PlusOutlined />} >Add to Repository</Button>

        
    
      
  
  
      <Table dataSource={dataSource} columns={column}/>
   


</div>
 </>
 );

}



export default RateTable