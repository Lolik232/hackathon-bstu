import {Nav, Navbar, OverlayTrigger, Popover} from "react-bootstrap";
import user from "../resources/user.c2a67c78.svg";
import logout from "../resources/logout.15a06318.svg"

export const UserPanel = ({name, status, ...props}) => {
    return (
        <OverlayTrigger trigger={"focus"} placement={"bottom"} overlay={
            <Popover className={"z-3"}>
                <Popover.Header>{name}<p className={"fst-italic m-0"}>{status}</p></Popover.Header>
                <Popover.Body>
                    <Navbar>
                        <Nav className={"flex-column"}>
                            <Nav.Item>
                                <Nav.Link>
                                    <img alt={""} src={logout} className={"me-2"}></img>
                                    Выход
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                </Popover.Body>
            </Popover>
        }>
            <Navbar className={"m-0 p-0"}>
                <Nav.Link className={"ms-1"}>
                    <img src={user} alt={""}/>
                </Nav.Link>
                <Nav.Link className={"d-none d-md-flex"}>
                    {name}
                </Nav.Link>
            </Navbar>
        </OverlayTrigger>
    )
}