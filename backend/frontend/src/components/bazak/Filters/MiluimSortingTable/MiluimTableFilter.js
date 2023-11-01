import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Alert,
    Spinner,
    Label,
    Col,
    Collapse
} from "reactstrap";
import axios from 'axios'
import Select from 'components/general/Select/AnimatedSelect'
import MultiSelect from 'components/general/Select/AnimatedMultiSelect'

const ManageUsersFilter = (props) => {
    const [roles, setRoles] = useState([])

    //units
    const [gdods, setGdods] = useState([]);
    const [ta, setTas] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [units, setUnits] = useState([]);
    //cartypes
    const [makats, setMakats] = useState([]);
    const [mkabazs, setMkabazs] = useState([]);
    const [magads, setMagads] = useState([]);
    const [magadals, setMagadals] = useState([]);
    //
    const [collapseOpen, setcollapseOpen] = React.useState(false);
    const toggleCollapse = () => {
        setcollapseOpen(!collapseOpen);
    };

    // const getroles = async () => {
    //     let temproles = [];
    //     temproles.push('הרשאת אדמין');
    //     temproles.push('הרשאת פיקוד');
    //     temproles.push('הרשאת אוגדה');
    //     temproles.push('הרשאת חטיבה');
    //     temproles.push('הרשאת גדוד');
    //     setRoles(temproles)
    // }

    const loadUnits = async () => {
        await axios.get("http://localhost:8000/api/units/",)
            .then(response => {
                setUnits(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const loadSubjects = async () => {

        await axios.get("http://localhost:8000/api/subject/",)
            .then(response => {
                setSubjects(response.data);    
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const loadTas = async () => {
                setTas();
    }

    const loadGdods = async (hativaids) => {
        let temphativaids = hativaids;
        if (temphativaids != undefined && !temphativaids.isArray) {
            temphativaids = [hativaids]
        }
        let temphativasgdods = [];
        if (temphativaids != undefined && temphativaids.length > 0) {
            for (let i = 0; i < temphativaids.length; i++) {
                await axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: temphativaids[i] })
                    .then(response => {
                        for (let j = 0; j < response.data.length; j++)
                            temphativasgdods.push(response.data[j])
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        setGdods(temphativasgdods);
    }

    function init() {
        // getroles();
        loadUnits();
    }

    useEffect(() => {
        setSubjects([]);
        loadSubjects();
    }, []);

    useEffect(() => {
        setTas([]);
        loadTas();
    }, []);

    useEffect(() => {
        setGdods([]);
        loadGdods(props.filter.hativa);
    }, [props.filter.hativa]);

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{ width: '100%', margin: 'auto', textAlign: 'right' }}>
            <Button onClick={toggleCollapse} style={{}}>סינון</Button>
            <Collapse isOpen={collapseOpen}>
                <Card style={{ background: 'rgb(228,228,228,0.2)' }}>
                    <Row style={{ margin: '0px' }}>
                        {/* <Col xs={12} md={2} style={{ textAlign: 'right' }}>
                            <h4 style={{ fontWeight: 'bold' }}>הרשאה</h4>
                            {roles ? roles.map((role, index) => {
                                {
                                    return (
                                        <Row>
                                            {props.filter.rolefilter && props.filter.rolefilter.indexOf(role) != -1 ?
                                                <button className="btn-empty" name={'role'} value={role} onClick={props.setfilterfunction}><h6 style={{ color: 'blue' }}>{role}</h6></button>
                                                : <button className="btn-empty" name={'role'} value={role} onClick={props.setfilterfunction}><h6 style={{ fontWeight: 'unset' }}>{role}</h6></button>}
                                        </Row>
                                    )
                                }
                            }) : null}
                        </Col> */}
                        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
                            <Row style={{ paddingTop: '10px', marginBottom: '15px' }}>
                                {((props.unittype == "admin")) ?
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>יחידה</h6>
                                                <MultiSelect data={units} handleChange2={props.handleChange8} name={'units'} />
                                            </Col> : null}

                                {((props.unittype == "admin") )?
                                            <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                                                <h6>מקצוע</h6>
                                                <MultiSelect data={subjects} handleChange2={props.handleChange8} name={'subjects'} />
                                            </Col> : null}

                                {((props.unittype == "admin"))?
                                    
                                        <Col
                                            style={{
                                                justifyContent: "right",
                                                alignContent: "right",
                                                textAlign: "right",
                                            }}
                                        >
                                            <h6 style={{}}>תא</h6>
                                            <Input
                                                placeholder="שם"
                                                type="select"
                                                name="ta"
                                                value={ta}
                                                onChange={props.handleChange8}
                                                id="selta"
                                            >
                                                <option value={"בחר"}>{"בחר"}</option>
                                                <option value={"הפעלה"}>{"הפעלה"}</option>
                                                <option value={"רפואה"}>{"רפואה"}</option>
                                                <option value={"שליטה"}>{"שליטה"}</option>
                                                <option value={"רישום ודיווח"}>{"רישום ודיווח"}</option>
                                                <option value={"פרט ומשפחות"}>{"פרט ומשפחות"}</option>
                                                <option value={"מפקד"}>{"מפקד"}</option>
                                                <option value={"ללא"}>{"ללא"}</option>
                                            </Input>
                                        </Col>
                                    : null}
                            </Row>
                        </Col>
                    </Row>
                </Card >
            </Collapse>
        </div>
    );
}
export default withRouter(ManageUsersFilter);;