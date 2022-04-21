import React, {Component} from "react";
import {Button, Form, InputNumber, Modal, Select, Table} from "antd";
import axios from "axios";
import "../../css/energy-meter.css";
import {base_url} from "../../commons/utils";


const {Option} = Select;
const columns = [
    {
        title: "№",
        dataIndex: "id",
        key: "id",
        width: "10%",
    },
    {
        title: "Home",
        dataIndex: "homeCode",
        key: "homeCode",
        width: "20%",
    },
    {
        title: "EnergyConsumption",
        dataIndex: "energyConsumption",
        width: "30%",
        key: "energyConsumption",
    },

    {
        title: "BuildingType",
        dataIndex: "buildingType",
        key: "buildingType",
        width: "25%",
    },
    {
        title: "cardNumber",
        dataIndex: "cardNumber",
        key: "cardNumber",
        width: "15%",
    },

    {
        title: "firstName",
        dataIndex: "firstName",
        key: "firstName",
        width: "15%",
    },

    {
        title: "Action",
        dataIndex: "",
        key: "x",
        // width: '12%',
        render: () => <a>Delete</a>,
    },
];
const data = [
    {
        key: 1,
        name: "John Brown sr.",
        age: 60,
        address: "New York No. 1 Lake Park",
        children: [
            {
                key: 11,
                name: "John Brown",
                age: 42,
                address: "New York No. 2 Lake Park",
            },
            {
                key: 12,
                name: "John Brown jr.",
                age: 30,
                address: "New York No. 3 Lake Park",
                children: [
                    {
                        key: 121,
                        name: "Jimmy Brown",
                        age: 16,
                        address: "New York No. 3 Lake Park",
                    },
                ],
            },
            {
                key: 13,
                name: "Jim Green sr.",
                age: 72,
                address: "London No. 1 Lake Park",
                children: [
                    {
                        key: 131,
                        name: "Jim Green",
                        age: 42,
                        address: "London No. 2 Lake Park",
                        children: [
                            {
                                key: 1311,
                                name: "Jim Green jr.",
                                age: 25,
                                address: "London No. 3 Lake Park",
                            },
                            {
                                key: 1312,
                                name: "Jimmy Green sr.",
                                age: 18,
                                address: "London No. 4 Lake Park",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
    },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

class AdminEnergyMeter extends Component {
    layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    headers = {
        'Authorization': `Bearer ${this.token}`
    }
    validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    constructor(props) {
        super(props);
        this.state = {isOpen: false, visible: false};
        this.state = {
            homes: {},
            energies: [],
            value: '',
            target: '',
            home: -1,
            energyconsuption: 0,
            btype: '',
            visible: false,
        };
        this.saveEnergy = this.saveEnergy.bind(this);

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onFinish = (values) => {
        this.handleOk();
        console.log(values);
        let energyObj = {
            homeId: null,
            energyConsumption: null,
            residential: '',
            institutional: '',
        };
        if (values) {
            if (values.Home.homeId) {
                energyObj.homeId = values.Home.homeId;
            }
            if (values.energyConsumption.energyConsumption) {
                energyObj.energyConsumption = values.energyConsumption.energyConsumption;
            }
            if (values.residential.residential) {
                energyObj.residential = values.residential.residential;
            }
            if(values.institutional.institutional){
              energyObj.institutional = values.institutional.institutional;
            }

            console.log( " BEFORE SAVING ENERGY METER ---> " + JSON.stringify(energyObj))
            alert(JSON.stringify(energyObj))
            if (energyObj.homeId && energyObj.energyConsumption && energyObj.residential) {
                this.saveEnergy(energyObj);
                window.location.reload();
            }
        }
    };

    componentDidMount() {
        this.getEnergyList();
    }

    saveEnergy(energy) {
        const token = window.localStorage.getItem("token");
        console.log(token);
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        axios.post(`${base_url}/energymeter/save`, energy, {headers: headers}).then(response => {
            if (response) {
                console.log(response);
                alert("save!")
            }
        })
    }

    handleChange = (selectedValue) => {
        console.log(selectedValue);
        this.setState({
            btype: selectedValue
        })
        this.getHomesList(selectedValue);
    }

    onChangeEnergy = e => {
        console.log(e.target.value);
        this.setState({energyconsuption: e.target.value});
    }

    handleChangeHome = (newValue) => {
        this.setState({
            home: newValue,
        })
        console.log({newValue});
    }

    getEnergyList=()=>{
      var apiBaseUrl = "http://localhost:8080/api/energymeter/all";
      var token = window.localStorage.getItem("token");
      var headers = {
          'Authorization':`Bearer ${token}`
      }
      axios.get(apiBaseUrl, { headers: headers }).then((response) =>{
          if(response&&response.data){
            console.log({response})
              this.setState({
                energies: response.data
              });
              console.log(this.state.energies);
          }
      }).catch(function (error) {
          console.log(error);
          alert(error)

      });
  }

    getHomesList = (selectedValue) => {
        var apiBaseUrl = `http://localhost:8080/api/home/getAllHomes?buildingType=${selectedValue}`;
        var token = window.localStorage.getItem("token");
        console.log(token);
        var headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.get(apiBaseUrl, {headers: headers}).then((response) => {
            if (response && response.data) {
                console.log({response})
                this.setState({
                    homes: response.data
                });
            }
        }).catch(function (error) {
            console.log(error);
            alert(error)

        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="energy-meter-table-title">
                    <h4>Energy Table</h4>
                    <Button type="primary" onClick={() => this.showModal()}>
                        Add Energy Meter
                    </Button>
                </div>
                <Table columns={columns} dataSource={this.state.energies} bordered title={''}/>

                <Modal
                    className="energy-meter-modal"
                    title="Create Energy Meter"
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                    footer={null}
                >
                    <Form {...this.layout} name="nest-messages" onFinish={this.onFinish}
                          validateMessages={this.validateMessages}>
                        <div className="energy-meter-modal-select">

                            <Form.Item

                                name={['residential', 'residential']}
                                noStyle
                                rules={[{required: true, message: 'Province is required'}]}
                            >
                                <Select onChange={e => this.handleChange(e)} placeholder="Select building type">
                                    <Option value="RESIDENTIAL">For Residential</Option>
                                    <Option value="INSTITUTIONAL">For Institutional</Option>
                                </Select>


                            </Form.Item>
                        </div>

                        <div className="energy-meter-modal-select">
                            <Form.Item
                                name={['Home', 'homeId']}
                                noStyle
                                rules={[{required: true, message: 'Province is required'}]}
                            >
                                <Select defaultValue="home" onChange={newValue => this.handleChangeHome(newValue)}
                                        value={this.state.home} aria-label="select">
                                    <Option value="home">Select home</Option>
                                    {/* <Option value="institutional"></Option> */}
                                    {
                                        Array.isArray(this.state.homes) ? this.state.homes.map((home, key) => (
                                            <option selected value={home.id}>{home.homeCode}, {home.homeNumber}</option>
                                        )) : ''
                                    }
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="energy-meter-modal-select energy-meter-modal-input">
                            <Form.Item
                                name={['energyConsumption', 'energyConsumption']}
                                label="EnergyConsumption"
                                rules={[
                                    {
                                        type: 'number',
                                        required: true,
                                        min: 0,
                                        max: 999999999,
                                    },
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>
                        </div>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="energy-meter-modal-submit">
                        <Button type="primary" onClick={() => this.handleOk()}>Ok</Button>

                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default AdminEnergyMeter;
