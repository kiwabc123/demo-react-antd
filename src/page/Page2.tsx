import React from 'react';
import { Form, Input, Button, Radio, Select, DatePicker, InputNumber, Table } from 'antd';
import { UserOutlined, MobileOutlined, IdcardOutlined } from '@ant-design/icons';

const { Option } = Select;

const Page2 = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      gender: 'Male',
      mobilePhone: '555-1234',
      nationality: 'American',
    },
    {
      key: '2',
      name: 'Jane Smith',
      gender: 'Female',
      mobilePhone: '555-5678',
      nationality: 'Thai',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Mobile Phone',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Manage',
      key: 'manage',
      render: () => <a>Edit</a>,
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }} className='app-container'>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', gap: '20px' }}> {/* Flex container to align form and table side by side */}
        
        {/* Scrollable form container */}
        <div style={{ width: '33%', maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}> {/* 1/3 width for the form with vertical scroll */}
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              padding: '20px',
              borderRadius: '6px',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            }}
            initialValues={{ gender: 'Male' }}
            layout="vertical"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please select a title' }]}
            >
              <Select placeholder="Title" size="small">
                <Option value="Mr.">Mr.</Option>
                <Option value="Mrs.">Mrs.</Option>
                <Option value="Miss">Miss</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Firstname"
              name="firstName"
              rules={[{ required: true, message: 'Please input your firstname!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Firstname" size="small" />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastName"
              rules={[{ required: true, message: 'Please input your lastname!' }]}
            >
              <Input placeholder="Lastname" size="small" />
            </Form.Item>

            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[{ required: true, message: 'Please select your birthday!' }]}
            >
              <DatePicker style={{ width: '100%' }} size="small" />
            </Form.Item>

            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: 'Please select your nationality!' }]}
            >
              <Select placeholder="Nationality" size="small">
                <Option value="thai">Thai</Option>
                <Option value="american">American</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Citizen ID"
              name="citizenId"
              rules={[{ required: true, message: 'Please input your Citizen ID!' }]}
            >
              <Input placeholder="Citizen ID" prefix={<IdcardOutlined />} size="small" />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
            >
              <Radio.Group size="small">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Unisex">Unisex</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Mobile Phone"
              name="mobilePhone"
              rules={[{ required: true, message: 'Please input your mobile phone!' }]}
            >
              <Input placeholder="Mobile Phone" prefix={<MobileOutlined />} size="small" />
            </Form.Item>

            <Form.Item
              label="Passport No."
              name="passportNo"
            >
              <Input placeholder="Passport No." size="small" />
            </Form.Item>

            <Form.Item
              label="Expected Salary"
              name="expectedSalary"
              rules={[{ required: true, message: 'Please input your expected salary!' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Expected Salary" size="small" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '48%' }} size="small">
                Submit
              </Button>
              <Button style={{ marginLeft: '4%', width: '48%' }} htmlType="button" onClick={() => form.resetFields()} size="small">
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Table placed beside the form */}
        <div style={{ width: '66%' }}> {/* 2/3 width for the table */}
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default Page2;
