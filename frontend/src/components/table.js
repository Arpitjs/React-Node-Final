import { Table } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Nav from './nav';

const TableComponent = () => {
  const [data, setData] = useState([
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Uniform_Resource_Locator.svg/220px-Uniform_Resource_Locator.svg.png",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Uniform_Resource_Locator.svg/220px-Uniform_Resource_Locator.svg.png",
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Uniform_Resource_Locator.svg/220px-Uniform_Resource_Locator.svg.png",
    },
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (image) => (
          <img src={image} />
      ),
    },
    {
      title: "Delete",
      render: (val) => <DeleteOutlined onClick={() => handleDelete(val)} />,
    },
    {
      title: "Edit",
      render: () => <EditOutlined />,
    },
  ];

  function handleDelete(val) {
    setData(data.filter((el) => el.key !== val.key));
  }
  return (
    <>
    <Nav/>
  <Table columns={columns} dataSource={data} pagination={false} />
  </>
  );
};

export default TableComponent;

// {
//   title: 'Tags',
//   key: 'tags',
//   dataIndex: 'tags',
//   render: tags => (
//     <>
//       {
//       tags.map(tag => {
//         let color = tag.length > 5 ? 'geekblue' : 'green';
//         if (tag === 'loser') {
//           color = 'volcano';
//         }
//         return (
//           <Tag color={color} key={tag}>
//             {tag.toUpperCase()}
//           </Tag>
//         );
//       })}
//     </>
//   ),
// },
