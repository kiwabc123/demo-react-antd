import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Select, DatePicker, InputNumber, Table, Popconfirm, Checkbox, notification } from 'antd';
import { UserOutlined, MobileOutlined, IdcardOutlined } from '@ant-design/icons';
import { addEmployee, removeEmployee, updateEmployee } from '../redux/slices/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { EmpType } from './interface/employee';
import dayjs from 'dayjs';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Page2 = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const employees = useSelector((state: { employee: { employees: EmpType[] } }) =>
        state.employee.employees.filter(emp => !emp.deleted)
    );
    const [editingEmployee, setEditingEmployee] = useState<EmpType | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const openNotification = (type: 'success' | 'error', message: string, description?: string) => {
        notification[type]({
            message,
            description,
            placement: 'topRight',
        });
    };

    const onFinish = (values: any) => {
        const newEmployee: EmpType = {
            title: values.title,
            key: values.citizenId,
            firstname: values.firstName,
            lastname: values.lastName,
            birthday: values.birthday.toISOString(),
            nationality: values.nationality,
            citizenID: values.citizenId,
            gender: values.gender,
            mobilePhone: values.mobilePhone,
            passportNo: values.passportNo || '',
            expectedSalary: values.expectedSalary,
            deleted: false
        };

        if (editingEmployee) {
            dispatch(updateEmployee(newEmployee));
            openNotification('success', t("Employee updated"), `${newEmployee.firstname} ${newEmployee.lastname} has been updated.`);
        } else {
            dispatch(addEmployee(newEmployee));
            openNotification('success', t("Employee added"), `${newEmployee.firstname} ${newEmployee.lastname} has been added.`);
        }

        form.resetFields();
        setEditingEmployee(null);
    };

    const handleEdit = (employee: EmpType) => {
        setEditingEmployee(employee);
        form.setFieldsValue({
            title: employee.title,
            firstName: employee.firstname,
            lastName: employee.lastname,
            birthday: employee.birthday ? dayjs(employee.birthday) : null,
            nationality: employee.nationality,
            citizenId: employee.citizenID,
            gender: employee.gender,
            mobilePhone: employee.mobilePhone,
            passportNo: employee.passportNo,
            expectedSalary: employee.expectedSalary,
        });
    };

    const handleDelete = (key: string) => {
        dispatch(removeEmployee(key));
        openNotification('success', t("Employee deleted"), t("Employee has been removed successfully."));
    };

    const handleSelect = (key: string) => {
        setSelectedRowKeys(prevKeys => {
            if (prevKeys.includes(key)) {
                return prevKeys.filter(k => k !== key);
            }
            return [...prevKeys, key];
        });
    };

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setSelectedRowKeys(employees.map(emp => emp.key));
        } else {
            setSelectedRowKeys([]);
        }
    };

    const handleDeleteSelected = () => {
        selectedRowKeys.forEach(key => {
            dispatch(removeEmployee(key.toString()));
        });
        openNotification('success', t("Employees deleted"), t("Selected employees have been removed successfully."));
        setSelectedRowKeys([]);
    };

    const columns = [
        {
            title: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Checkbox
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < employees.length}
                        checked={selectedRowKeys.length === employees.length}
                        onChange={handleSelectAll}
                    />
                    <Button
                        type="default"
                        onClick={handleDeleteSelected}
                        disabled={selectedRowKeys.length === 0}
                        style={{ marginLeft: '10px' }}
                    >
                        {t("deleteSelected")}
                    </Button>
                </div>
            ),
            dataIndex: 'select',
            key: 'select',
            width: 150,
            render: (_: any, record: EmpType) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={() => handleSelect(record.key)}
                />
            ),
        },
        {
            title: t("firstname") + " " + t("lastname"),
            dataIndex: 'firstname',
            key: 'firstname',
            render: (text: string, record: EmpType) => `${record.firstname} ${record.lastname}`,
            sorter: (a: EmpType, b: EmpType) =>
                `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`),
        },
        {
            title: t("gender.text"),
            dataIndex: 'gender',
            key: 'gender',
            render: (text: string) => t(`gender.${text}`),
            sorter: (a: EmpType, b: EmpType) => a.gender.localeCompare(b.gender),
        },
        {
            title: t("mobilePhone"),
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
            sorter: (a: EmpType, b: EmpType) => a.mobilePhone.localeCompare(b.mobilePhone),
        },
        {
            title: t("nationality.text"),
            dataIndex: 'nationality',
            key: 'nationality',
            render: (text: string) => t(`nationality.${text}`),
            sorter: (a: EmpType, b: EmpType) => a.nationality.localeCompare(b.nationality),
        },
        {
            title: t("manage"),
            key: 'manage',
            render: (text: string, record: EmpType) => (
                <>
                    <a onClick={() => handleEdit(record)}>{t("edit")}</a>
                    <a onClick={() => handleDelete(record.key)}> {t("delete")}</a>
                </>
            ),
        },
    ];

    return (
        <div className="app-container">
            <header className="page-header">
                <h1>{t("Card1Description")}</h1>
            </header>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='app-container'>
                <div style={{ display: 'flex', width: '100%', maxWidth: '100vw', gap: '20px' }}>
                    <div style={{ width: '30%', maxHeight: '80vh', overflowY: 'auto', paddingRight: '10px' }}>
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
                            layout="vertical"
                        >
                            <Form.Item
                                label={t("title")}
                                name="title"
                                rules={[{ required: true, message: t("pleaseSelectTitle") }]}>

                                <Select placeholder={t("title")} size="small">
                                    <Option value="Mr.">{t("Mr.")}</Option>
                                    <Option value="Mrs.">{t("Mrs.")}</Option>
                                    <Option value="Miss">{t("Miss")}</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={t("firstname")}
                                name="firstName"
                                rules={[{ required: true, message: t("pleaseInputFirstname") }]}>

                                <Input prefix={<UserOutlined />} placeholder={t("firstname")} size="small" />
                            </Form.Item>

                            <Form.Item
                                label={t("lastname")}
                                name="lastName"
                                rules={[{ required: true, message: t("pleaseInputLastname") }]}>

                                <Input placeholder={t("lastname")} size="small" />
                            </Form.Item>

                            <Form.Item
                                label={t("birthday")}
                                name="birthday"
                                rules={[{ required: true, message: t("pleaseSelectBirthday") }]}>

                                <DatePicker style={{ width: '100%' }} size="small" />
                            </Form.Item>

                            <Form.Item
                                label={t("nationality.text")}
                                name="nationality"
                                rules={[{ required: true, message: t("pleaseSelectNationality") }]}>

                                <Select placeholder={t("nationality.text")} size="small">
                                    <Option value="thai">{t("Thai")}</Option>
                                    <Option value="american">{t("American")}</Option>
                                    <Option value="other">{t("Other")}</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label={t("citizenId")}
                                name="citizenId"
                                rules={[{ required: true, message: t("pleaseInputCitizenId") }]}>

                                <Input placeholder={t("citizenId")} prefix={<IdcardOutlined />} size="small" />
                            </Form.Item>

                            <Form.Item
                                label={t("gender.text")}
                                name="gender"
                                rules={[{ required: true, message: t("pleaseSelectGender") }]}>

                                <Radio.Group size="small">
                                    <Radio value="Male">{t("male")}</Radio>
                                    <Radio value="Female">{t("female")}</Radio>
                                    <Radio value="Other">{t("other")}</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label={t("mobilePhone")}
                                name="mobilePhone"
                                rules={[{ required: true, message: t("pleaseInputMobilePhone") }]}>

                                <Input placeholder={t("mobilePhone")} prefix={<MobileOutlined />} size="small" />
                            </Form.Item>

                            <Form.Item
                                label={t("passportNo")}
                                name="passportNo">

                                <Input placeholder={t("passportNo")} size="small" />
                            </Form.Item>

                            <Form.Item
                                label={t("expectedSalary")}
                                name="expectedSalary"
                                rules={[{ required: true, message: t("pleaseInputExpectedSalary") }]}>

                                <InputNumber style={{ width: '100%' }} placeholder={t("expectedSalary")} size="small" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    {t("submit")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div style={{ width: '70%', paddingLeft: '10px' }}>
                        <Table
                            rowKey="key"
                            dataSource={employees}
                            columns={columns}
                            pagination={{
                                pageSize: 4,
                                showSizeChanger: true,
                                itemRender: (page, type, originalElement) => {
                                    if (type === 'prev') {
                                        return <a>{t("prev")}</a>;
                                    }
                                    if (type === 'next') {
                                        return <a>{t("next")}</a>;
                                    }
                                    return originalElement;
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page2;
