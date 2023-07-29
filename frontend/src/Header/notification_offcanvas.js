import {Col, Nav, Offcanvas, Row, Tab} from "react-bootstrap";

export const NotificationOffcanvas = ({show, handler, ...props}) => {
    return (
        <Offcanvas show={show} onHide={handler} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Уведомления</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <Tab.Container id="left-tabs-example" defaultActiveKey="unread">
                    <Row>
                        <Col>
                            <Nav variant="underline" className="flex-column" >
                                <Nav.Item>
                                    <Nav.Link eventKey="unread" className={"px-4"}>Непрочитанные</Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                        <Col>
                            <Nav variant="underline" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="read" className={"px-4"}>Прочитанные</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Tab.Content>
                            <Tab.Pane eventKey="unread">У вас нет уведомлений</Tab.Pane>
                            <Tab.Pane eventKey="read">У вас нет уведомлений</Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>

            </Offcanvas.Body>
        </Offcanvas>
    )
}