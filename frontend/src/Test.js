function Test(props) {
    return (
        <>
            <TestHeader/>
            <TestMain name={props.name} questions={props.questions}/>
            <TestFooter/>
        </>
    )
}

function TestHeader() {
    return (
        <header>
            <h1>
                BSTU
            </h1>
        </header>
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

export default Test