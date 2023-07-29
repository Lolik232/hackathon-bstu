import {Nav} from "react-bootstrap";
import user from "../resources/user.c2a67c78.svg";

export const UserPanel = ({name, ...props}) => {
    return (
        <>
            <Nav.Link className={"ms-1"} eventKey={"username-nav-pressed"}>
                <img src={user} alt={""}/>
            </Nav.Link>
            <Nav.Link eventKey={"username-nav-pressed"} className={"d-none d-md-flex"}>
                {name}
            </Nav.Link>
        </>
    )
}