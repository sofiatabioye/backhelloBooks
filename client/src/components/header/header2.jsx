import React from 'react';
import { Navbar, NavItem, Row, Col, Card, CardTitle, Tab, Input, Icon, Button } from 'react-materialize';
import Footer from '../footer/footer.jsx';

const Home = (props) => (
    <div>
        <Navbar brand="HelloBooks" right>
            <NavItem href="/books">Library</NavItem>
        </Navbar>
        <Row className="homepage">
            <div className="container">

                <Card className="" >
                    <Row>
                        <Col m={6} s={12} l={6}>
                            <h6>Member Login</h6>
                            <form method="post" onSubmit={props.onSignIn}>
                                <Input type="email" label="Email/Username" name="identifier" s={12} onChange={props.onChange} validate><Icon>mail</Icon></Input>
                                <Input type="password" name="password" label="password" onChange={props.onChange} s={12} validate><Icon>lock</Icon></Input>
                                <Button waves="light" type="submit">Sign In</Button>
                            </form>
                            <p>Forgot Password? <a href="/">Click here </a></p>
                        </Col>
                        <div className="divider" />
                        <Col m={6} s={12} l={6}>
                            <h6>Not yet a Member? Sign Up</h6>
                            <form method="post" onSubmit={props.onSignUp}>
                                <Input type="text" className="validate" onChange = {props.onChange} label="Username" s={12} name="username"required><Icon>account_circle</Icon></Input>
                                <Input type="email" label="Email/Username" name="email" s={12} onChange={props.onChange} className="validate" required><Icon>mail</Icon></Input>
                                <Input type="password" name="password" label="password" onChange={props.onChange} s={12}
                                    className="validate" required ><Icon>lock</Icon></Input>
                                <Input type="password" onChange = {props.onChange} name= "confirmPassword" label="confirm password" s={12} className="validate" required><Icon>lock</Icon></Input>
                                <Button waves="light" type="submit">Sign Up</Button>
                            </form>
                        </Col>
                    </Row>
                </Card>
                {/* <Col m={2} l={2} />
                    <Col s={12} m={8} l={8} className="grid-example">
                        <Card className="small"
                            header={<CardTitle image="http://res.cloudinary.com/ddvm5tzhm/image/upload/c_scale,w_400/v1508337948/hieu-vu-minh-91995_wkljol.jpg" role="presentation">HelloBooks</CardTitle>}
                        >
                            <h5>Welcome to HelloBooks Champ!!!</h5>
                            <p>The best online library where to you get access to the widest range of quality books for your consumption.</p>

                        </Card>
                    </Col> */}

            </div>
        </Row>
        <Footer/>
    </div>
);
export default Home;
