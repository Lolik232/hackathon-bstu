import {Button, Card, CloseButton, Container, FloatingLabel, Form, FormLabel, ListGroup} from "react-bootstrap";
import Select from 'react-select';
import React from "react";
import "./EditableQuestionBox.css";
import {SingleAnswer} from "../Answer/SingleAnswer";
import {makeCheckable, makeIndexed, makeRef} from "../List/List";
import {MultipleAnswer} from "../Answer/MultipleAnswer";

export function EditableQuestionBoxWrapper() {
    const dataRef = makeRef({
        type: 0,
        difficulty: 0,
        cost: 0,
        question: "",
        annotation: "",
        answerListRef: makeRef([])
    });

    return {
        body: <EditableQuestionBox dataRef={dataRef}/>,
        dataRef: dataRef
    }
}

function EditableQuestionBox({dataRef}) {

    return (
        <Container className="CardBox">
            <Card>
                <Card.Header>
                    <QuestionBoxBodyHeader dataRef={dataRef}/>
                </Card.Header>
                <Card.Body>
                    <QuestionBoxBodyQuestion dataRef={dataRef}/>
                    <QuestionBoxBodyAnnotation dataRef={dataRef}/>
                    <QuestionBoxBodyMultipleAnswer dataRef={dataRef}/>
                </Card.Body>
                <Card.Footer>
                    <QuestionBoxBodyFooter dataRef={dataRef}/>
                </Card.Footer>
            </Card>
        </Container>
    )
}

function QuestionBoxBodyHeader({dataRef}) {
    const typeOptions = [
        {value: 0, label: "Вопрос с выбором одного ответа"},
        {value: 1, label: "Вопрос с выбором множественного ответа"},
        {value: 2, label: "Вопрос на установление последовательности"},
        {value: 3, label: "Вопрос на установление соответствия"},
        {value: 4, label: "Вопрос на дополнение фразы"},
        {value: 5, label: "Вопрос с развернутым ответом"},
    ]

    const difficultyOptions = [
        {value: 0, label: "Легко"},
        {value: 1, label: "Средне"},
        {value: 2, label: "Сложно"},
    ]

    return (
        <div className="d-flex justify-content-between">
            <Select options={typeOptions} placeholder={"Выберите тип вопроса"} onChange={(value) => {
                dataRef.ref.type = value.value;
            }}/>
            <Select options={difficultyOptions} placeholder={"Выберите сложность вопроса"} onChange={(value) => {
                dataRef.ref.difficulty = value.value;
            }}/>
        </div>
    )
}

function QuestionBoxBodyQuestion({dataRef}) {
    return (
        <div>
            <Form.Control as="textarea" placeholder={"Введите текст вопроса"} rows={5} onInput={(event) => {
                dataRef.ref.question = event.target.value;
            }}/>
        </div>
    )
}

function QuestionBoxBodyAnnotation({dataRef}) {
    return (
        <div className={"mt-3"}>
            <Form.Control as="textarea" placeholder={"Введите пояснение к вопросу"} rows={1} onInput={(event) => {
                dataRef.ref.annotation = event.target.value;
            }}/>
        </div>
    )
}

const QuestionBoxBodySingleAnswer = () => {

    function Item({index}) {
        const handleOnClick = (event) => {
            answer.splice(index, 1);
            setAnswer(answer);
            answerRef.ref = makeCheckable(makeIndexed(answer));
            console.log(answer);
            event.stopPropagation()
        }

        return (
            <div className={"d-flex justify-content-between"}>
                <Form.Control as="textarea" rows={1} className={"w-50"} onClick={(event) => (event.stopPropagation())}/>
                <CloseButton onClick={handleOnClick}/>
            </div>
        )
    }

    const [answer, setAnswer] = React.useState([]);
    const answerRef = makeRef(makeCheckable(makeIndexed(answer)));


    const handleOnClick = () => {
        setAnswer([...answer, <Item index={answer.length}/>]);
        answerRef.ref = makeCheckable(makeIndexed(answer));
    }

    return (
        <div className={"mt-5"}>
            <SingleAnswer answerRef={answerRef}/>

            <div className={"mt-3"}>
                <Button id={"add"} onClick={handleOnClick}>+</Button>
                <FormLabel htmlFor={"add"} className={"ms-3"}><i>Добавить ответ</i></FormLabel>
            </div>
        </div>
    )
}

const QuestionBoxBodyMultipleAnswer = ({dataRef}) => {
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

    function Item({index, inValueRef}) {
        const handleOnClick = (event) => {
            answer.splice(index, 1);
            setAnswer(answer);
            answerRef.ref = makeCheckable(makeIndexed(answer));
            console.log(answer);
            event.stopPropagation()
        }


        return (
            <div className={"d-flex justify-content-between"}>
                <Form.Control as="textarea" rows={1} className={"w-50"}
                              onClick={(event) => (event.stopPropagation())}
                              onChange={(event)=>{
                                  inValueRef.ref = event.target.value;
                                  forceUpdate();
                              }}/>
                <CloseButton onClick={handleOnClick}/>
            </div>
        )
    }

    const [answer, setAnswer] = React.useState([]);
    const answerRef = makeRef(makeCheckable(makeIndexed(answer)));


    const handleOnClick = () => {
        setAnswer([...answer, <Item index={answer.length} inValueRef={makeRef("")}/>]);
        answerRef.ref = makeCheckable(makeIndexed(answer));
    }

    dataRef.ref.answerListRef = answerRef;

    return (
        <div className={"mt-5"}>
            <MultipleAnswer answerRef={answerRef}/>

            <div className={"mt-3"}>
                <Button id={"add"} onClick={handleOnClick}>+</Button>
                <FormLabel htmlFor={"add"} className={"ms-3"}><i>Добавить ответ</i></FormLabel>
            </div>
        </div>
    )
}


function QuestionBoxBodyFooter({dataRef}) {
    const [cost, setCost] = React.useState(0)

    const handleOnInput = (event) => {
        const inputCost = (event.target.validity.valid) ? event.target.value : cost;
        setCost(inputCost);
        dataRef.ref.cost = inputCost;
    }


    return (
        <div className="d-flex justify-content-end align-middle">
            <Form.Label className={"mt-auto d-block"} htmlFor={"cost"}>Стоимость вопроса: </Form.Label>
            <Form.Control id={"cost"} className={"CostInput mt-auto ms-3"} as="input" type="text"
                          pattern="[1-9][0-9]{0,2}" onInput={handleOnInput} value={cost === 0 ? "" : cost}/>
        </div>
    )
}