import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Row, Col, Input, Icon, Button } from 'react-materialize';

const Home = (props) => {
    const errors = props.errors;
    return (
        <Row className="homepage">
            <Col s={1} m={2} l={2} className="sidebar-home"/>
            <Col s={10} m={8} l={8}>
                <div className="authpage">
                    <div className="container">
                        <h1>Welcome to HelloBooks</h1>
                        <p>The best online library to quench your reading thirst</p>
                        <Tabs>
                            <TabList>
                                <Tab>Login</Tab>
                                <Tab>Sign Up</Tab>
                            </TabList>

                            <TabPanel>
                                <form method="post" onSubmit={props.onSignIn}>
                                    <Input type="email" label="Email" name="email" s={12} onChange={props.onChange} validate><Icon>mail</Icon></Input>
                                    <Input type="password" name="password" label="password" onChange={props.onChange} s={12} validate><Icon>lock</Icon></Input>
                                    <Button waves="light" type="submit" className="btn-hb">Sign In</Button>
                                </form>
                                <p className="forgot"><Link to={"/forgotpassword"}>Forgot Password?></Link></p>
                            </TabPanel>
                            <TabPanel>
                                <form method="post" onSubmit={props.onSignUp}>
                                    <Input type="text" className="validate" onChange = {props.onChange} label="Username" s={12} name="username"required><Icon>account_circle</Icon></Input>
                                    {errors.username && <div className="red-text">{errors.username}</div> }
                                    <Input type="email" label="Email" name="email" s={12} onChange={props.onChange} className="validate" required><Icon>mail</Icon></Input>
                                    {errors.email && <div className="red-text">{errors.email}</div> }
                                    <Input type="password" name="password" label="password" onChange={props.onChange} s={12}
                                        className="validate" required ><Icon>lock</Icon></Input>
                                    {errors.password && <div className="red-text">{errors.password}</div> }
                                    <Input type="password" onChange = {props.onChange} name= "confirmPassword" label="confirm password" s={12} className="validate" required><Icon>lock</Icon></Input>
                                    {errors.confirmPassword && <div className="red-text">{errors.confirmPassword}</div> }
                                    <Button waves="light" type="submit" className="btn-hb">Sign Up</Button>
                                </form>
                            </TabPanel>
                        </Tabs>

                    </div>
                </div>
            </Col>
            <Col s={1} m={2} l={2} className="sidebar-home"/>
        </Row>
    );
};
export default Home;
