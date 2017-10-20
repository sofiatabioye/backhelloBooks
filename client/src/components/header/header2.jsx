import React from 'react';
import { Navbar, NavItem, Row, Col, Card, CardTitle, Tabs, Tab, Input, Icon, Button } from 'react-materialize';

const Home = (props) => (
    <div>
        <Navbar brand="HelloBooks" right>
            <NavItem href="/books">Library</NavItem>
        </Navbar>
        <Row className="homepage">
            <div className="container">
                <Col m={2} l={2} />
                <Col s={12} m={8} l={8} className="grid-example">
                    <Card className="small"
                        header={<CardTitle image="http://res.cloudinary.com/ddvm5tzhm/image/upload/c_scale,w_400/v1508337948/hieu-vu-minh-91995_wkljol.jpg" role="presentation">HelloBooks</CardTitle>}
                    >
                        <h5>Welcome to HelloBooks Champ!!!</h5>
                        <p>The best online library where to you get access to the widest range of quality books for your consumption.</p>

                    </Card>
                    <Tabs className="tab-demo">

                        <Tab title="Sign In" onSubmit={props.onSubmit} >
                            <Input type="email" label="Email/Username" s={12} name="identifier" validate><Icon>mail</Icon></Input>
                            <Input type="password" name="password" label="password" s={12} validate><Icon>lock</Icon></Input>
                            <Button waves="light" type="submit">Sign In</Button>
                            <p>Forgot Password? <a href="/">Click here </a></p>
                        </Tab>

                        <Tab title="Sign Up" active>
                            <Input type="text" label="Username" s={12} ><Icon>account_circle</Icon></Input>
                            <Input type="email" label="Email" s={12} ><Icon>mail</Icon></Input>
                            <Input type="password" label="password" s={12} ><Icon>lock</Icon></Input>
                            <Input type="password" label="confirm password" s={12} ><Icon>lock</Icon></Input>
                            <Button waves="light">Sign Up</Button>
                        </Tab>
                    </Tabs>
                </Col>

            </div>
        </Row>
    </div>
);
export default Home;
