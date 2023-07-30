import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import {Navbar, Nav, FloatingLabel, NavbarBrand, Container} from "react-bootstrap";
import info from "../resources/info.fa120a3e.svg";
import Row from "react-bootstrap/Row";
import logo from "../resources/logo-blue.svg";

function Login() {
    return (
        <div className={"d-flex justify-content-center align-items-center vh-100 Page"}>
            <Navbar className={"position-fixed w-100 z-3 top-0 bg-body-tertiary"}>
                <Container>
                    <Navbar.Brand href="https://www.bstu.ru">
                        <img src={logo} alt={""} className="d-inline-block align-content-center"/>
                        <p className={"m-0"}>Система тестирования</p>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Form className={"LoginBox bg-white"}>
                <Row>
                    <h2 className={"mb-3"}>Вход</h2>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            label="Корпоративный E-mail"
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <FloatingLabel label="Пароль">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check id={"1"} type="checkbox" label="Запомнить меня"/>
                        <Form.Check id={"2"} type="checkbox" label="Я согласен на обработку персональных данных"/>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">
                        Войти
                    </Button>
                </Row>
            </Form>
        </div>);
}

export default Login;