import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Navbar from "../sidebar/Navbar";

import classes from "./customer.module.css";
import {Button, Col, Row} from "react-bootstrap";
import "../../css/dashboard.css";
import {Avatar, Card, Form, Modal, Select} from "antd";
import img from "../../images/home1.jpg";
import img5 from "../../images/home5.jpg";
import img7 from "../../images/user.jpg";
import {getToken} from "../../commons/utils";

const {Meta} = Card;
const {Option} = Select;

export class CustomerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false, visible: false};
        this.state = {
            address: "", customers: [], homes: [], selectedUser:""
        };
    }

    showModal = (home) => {
        this.getAllRegisteredUsers();
        console.log(JSON.stringify(home))
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


    componentDidMount() {
        this.getCurrentUserHomes();
    }

    getCurrentUserHomes = () => {
        var apiBaseUrl = "http://localhost:8080/api/home/getHomesWithCurrentUser";

        var token = window.localStorage.getItem("token");

        var headers = {
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        axios
            .get(apiBaseUrl, {headers: headers})
            .then((response) => {
                if (response && response.data) {
                    console.log(response);
                    this.setState({
                        homes: response.data,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    };

    getAllRegisteredUsers = () => {
        var apiBaseUrl = `http://localhost:8080/api/user/all`;
        var token = getToken()
        console.log(token);
        var headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.get(apiBaseUrl, {headers: headers}).then((response) => {
            if (response && response.data) {
                console.log(response.data)
                this.setState({
                    customers: response.data
                });
            }
        }).catch(function (error) {
            alert(error)
        });
    }

    getInstitutionalButton = (home) => {
        if (home.buildingType === 'INSTITUTIONAL') {
            return <Button type="primary" onClick={() => this.showModal(home)}>
                        Transfer Owner
                    </Button>
        }
    }

    changeHomeOwner = (homeId) =>{
        const userId = this.state.selectedUser;
        var apiBaseUrl = `http://localhost:8080/api/home/changeHomeOwner?userId=${userId}&homeId=${homeId}`;
        var headers = {
            'Authorization': `Bearer ${getToken()}`
        };
        axios.post(apiBaseUrl, {headers: headers}).then((response) => {
            if (response && response.data) {
                this.setState({
                    customers: response.data
                });
                this.handleOk();
                window.location.reload();
            }
        }).catch(function (error) {
            alert(error)
        });
    }

    handleChangeHome = (userId) => {
        this.setState({
            selectedUser: userId
        });
    }

    render() {
        // const[array] = this.state;
        return (<div>
            <Navbar/>
            <br/>
            {/* <h2 className="text-center">YOUR DASHBOARD</h2> */}
            <div className="container">
                <div className="cards">
                    <h1> Home's Energy Board</h1>
                    <div className="cards__container">
                        <div className="cards__wrapper">
                            <Row>
                                {Array.isArray(this.state.homes) ? this.state.homes.map((home, key) => (
                                    <Col key={key} className="p-3" md={6}>
                                        <div className="cards__item">
                                            {/* <Link className="cards__item__link" to={"/homes"}> */}
                                            <figure
                                                className="cards__item__pic-wrap"
                                                data-category={""}
                                            >
                                                <div className={classes.cardItem}>
                                                    <Card
                                                        cover={// <img src={img4}/>
                                                            <Link to="homes">
                                                                <img
                                                                    src={img5}
                                                                    className="cards__item__img"
                                                                />
                                                            </Link>}
                                                    >
                                                        <div className="cards__item__info">
                                                            <h5 className="cards__item__text">
                                                                {" "}
                                                                {home.homeCode} - {home.buildingType}
                                                            </h5>
                                                        </div>
                                                        <Meta
                                                            avatar={<Avatar src={img7}/>}
                                                            // title="Card title"
                                                            description="Get To Know About Your Home Energy Billing Informations"
                                                        />
                                                    </Card>
                                                    <div className="button_container dashboard-buttons">
                                                        <Link to={`energymeter/${home.id}`}>
                                                            <Button
                                                                className={classes.button}
                                                                variant="success"
                                                            >
                                                                EnergyMeter
                                                            </Button>
                                                        </Link>

                                                        {/* <Link to={`bill/${home.id}`}><Button className={classes.button} variant="success">Billing</Button></Link> */}

                                                        {/* <Link to="pay"><Button className={classes.button} variant="success">INSTITUTIONAL</Button></Link> */}

                                                        <React.Fragment>
                                                            <div className="energy-meter-table-title">
                                                                {
                                                                    this.getInstitutionalButton(home)
                                                                }
                                                            </div>
                                                            <Modal
                                                                className="energy-meter-modal"
                                                                title="Transfer building"
                                                                visible={this.state.visible}
                                                                onOk={() => this.handleOk()}
                                                                onCancel={() => this.handleCancel()}
                                                                footer={null}
                                                            >

                                                                <Form
                                                                    {...this.layout}
                                                                    name="nest-messages"
                                                                    validateMessages={this.validateMessages}
                                                                >
                                                                    <div className="energy-meter-modal-select">
                                                                        <ul>
                                                                            <li>Home Id : {home.id}</li>
                                                                            <li>Home Number : {home.homeNumber}</li>
                                                                            <li>Home Code : {home.homeCode}</li>
                                                                            <li>Owner : {home.cardNumber}</li>
                                                                            <li>District : {home.district}</li>
                                                                            <li>Street : {home.street}</li>
                                                                        </ul>
                                                                        <Form.Item
                                                                            name={["residential", "residential",]}
                                                                            noStyle
                                                                            rules={[{
                                                                                required: true,
                                                                                message: "Province is required",
                                                                            },]}
                                                                        >
                                                                            <Select defaultValue="customer" onChange={newValue => this.handleChangeHome(newValue)}
                                                                                    value={this.state.customers}
                                                                                    aria-label="select">
                                                                                <Option>Select customer to
                                                                                    own the house/building</Option>
                                                                                {
                                                                                    Array.isArray(this.state.customers) ? this.state.customers.map((customer, key) => (
                                                                                        <option selected
                                                                                                value={customer.id}>{customer.firstName} {customer.lastName} -
                                                                                            User
                                                                                            - {customer.cardNumber}</option>
                                                                                    )) : ''
                                                                                }
                                                                            </Select>
                                                                        </Form.Item>
                                                                    </div>
                                                                </Form>

                                                                <div className="energy-meter-modal-submit">
                                                                    <Button
                                                                        type="primary"
                                                                        onClick={() => {
                                                                            this.changeHomeOwner(home.id)
                                                                        }}
                                                                    >
                                                                        Switch Home Owner
                                                                    </Button>
                                                                </div>
                                                            </Modal>
                                                        </React.Fragment>
                                                    </div>
                                                </div>
                                            </figure>
                                            {/* </Link> */}
                                        </div>
                                    </Col>)) : ""}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default CustomerDashboard;
