import Nav from 'react-bootstrap/Nav';
import "./Footer.css"
function AppFooter() {
    return (

            <Nav defaultActiveKey="/home" className="flex-column justify-content-center FooterNav">
                <Nav.Link className={"link-light"} href="https://support.bstu.ru">Обратная связь</Nav.Link>
                <Nav.Link className={"link-light"} href="tel://84722550504">+7 (4722) 55 05 04 — телефон доверия</Nav.Link>
                <Nav.Link className={"link-light"} href="tel://88002225571">8 800 222 55 71 — телефон горячей линии МинОбрНауки</Nav.Link>
                <Nav.Link className={"link-light"} href="https://www.bstu.ru"> © 2000 — {new Date().getFullYear()} БГТУ им. В.Г. Шухова</Nav.Link>
            <Nav.Link className={"link-light"} href="https://www.bstu.ru/pd">Политика БГТУ им. В.Г. Шухова в отношении обработки персональных данных</Nav.Link>
            </Nav>

    );
}

export default AppFooter;