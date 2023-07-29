import {useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "../resources/logo-blue.svg";
import notification_off from "../resources/notification.e81b7dd5.svg";
import {UserPanel} from "./user_panel";
import {NotificationOffcanvas} from "./notification_offcanvas";

export const AppHeader = () => {
    const [showNotificationOffcanvas, setShowNotificationOffcanvas] = useState(false);

    const handleShow = () => setShowNotificationOffcanvas(true);
    const handleClose = () => setShowNotificationOffcanvas(false);

    return (
        <header className={"position-fixed w-100 z-3 top-0"}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="https://www.bstu.ru">
                        <img src={logo} alt={""} className="d-inline-block align-content-center"/>
                        <p className={"m-0"}>Система тестирования</p>
                    </Navbar.Brand>

                    <Navbar className={"justify-content-end"} onSelect={(eventKey) => {
                        eventKey === "show-offcanvas" && handleShow();

                    }}>
                        <Nav>
                            <Nav.Item className={"me-4"}>
                                <Nav.Link eventKey={"show-offcanvas"}>
                                    <img src={notification_off} alt={""}/>
                                </Nav.Link>
                            </Nav.Item>

                            <UserPanel name={"Иванов И.И."} status={"Студент"}/>

                        </Nav>
                    </Navbar>
                    <NotificationOffcanvas show={showNotificationOffcanvas} handler={handleClose}/>
                </Container>
            </Navbar>
        </header>
    )
}

export default AppHeader;