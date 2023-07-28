import './Test.css';
import { ReactComponent as YourSvg } from './resources/logo_svg.svg';
function Test(props) {
    return (
        <body className={Test}>
        <TestHeader/>
        <TestMain name={props.name} questions={props.questions}/>
        <TestNavigationForm/>
        <TestFooter/>
        </body>
    )
}

function TestHeader() {
    return (
        <header className="Test_Header">
            <YourSvg></YourSvg>
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
            <ul>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                <li>question</li>
                {/*{props.questions.map((obj) => <li key={obj}>{obj}</li>)*/}
                {/*}*/}
            </ul>
        </div>
    )
}

function TestNavigationForm(props) {
    return (
        <div className="TestNavigationForm">
            <button type={"submit"}>Завершить тест</button>
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

function TestFooter() {
    return (
        <footer>
            <ul>
                <li>Conatct</li>
                 <li>Conatct</li>
                <li>Conatct</li>
                <li>Conatct</li>
            </ul>
        </footer>
    )
}


function TestName(props) {
    return (
        <div id="test_name">
            <h2>{props.name}</h2>
        </div>
    )
}

function TestQuestionList(props) {
    return (
        <ul>
            {props.questions.map(
                (obj) => <li key={obj}>{obj}</li>)
            }
        </ul>
    )
}

export default Test;

