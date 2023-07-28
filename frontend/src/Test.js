import './Test.css';
import {GetQuestionBoxContent, QuestionBox} from "./QuestionBox";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Test(props) {
    return (

        <body className={Test}>
        <Form>
            <Row>
                <Col>
                    <TestHeader/>
                    <TestMain name={props.name} questions={props.questions}/>
                </Col>
                <Col>
                    <TestNavigationForm/>
                </Col>
            </Row>
        </Form>
        </body>
    )
}

function TestHeader() {
    return (
        <header className="Test_Header">
        </header>
    )
}


function TestName(props) {
    return (
        <div className={"TestName"}>
            <h2>{props.name}</h2>
        </div>
    )
}

function TestQuestionList(props) {
    return (
        <div className="TestQuestionList">
            <QuestionBox
                content={GetQuestionBoxContent(2, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy", "afdsasd"], 0, 2, '3123')}/>
            <QuestionBox
                content={GetQuestionBoxContent(1, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy"], 1, 1, 'йцуйцу')}/>
            <QuestionBox
                content={GetQuestionBoxContent(0, "Самый крутой вопрос в мире от самое длинной письки в мире", ["my dick is big", "oh, myy"], 2, 5, 'йуцйцуй')}/>
            <ul>
                {props.questions.map((obj) => <li key={obj}>{obj}</li>)
                }
            </ul>
        </div>
    )
}

function TestNavigationForm(props) {
    return (
        <div className="TestNavigationForm">
            <button className={"endButton"} type={"submit"}>Завершить тест</button>
        </div>
    )
}

function TestMain(props) {
    return (
        <main>
            <TestName name={props.name}/>
            <TestQuestionList questions={props.questions}/>
        </main>
    )
}


export default Test;

