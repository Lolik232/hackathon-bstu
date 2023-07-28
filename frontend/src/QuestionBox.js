import React from "react";
import "./QuestionBox.css"

import {
    Badge,
    Form,
    Card,
    Container,
    ListGroup, ListGroupItem
} from "react-bootstrap";

import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {SortableItem} from './SortableItem';


export function GetQuestionBoxContent(type, question, answer, difficulty, cost, hash) {
    return {
        type: type,
        question: question,
        answer: answer,
        difficulty: difficulty,
        cost: cost,
        hash: hash
    }
}

export function QuestionBox({content}) {
    return (
        <Container className="CardBox">
            <Card>
                <Card.Header>
                    <QuestionBoxHeader content={content}/>
                </Card.Header>
                <Card.Body>
                    <QuestionBoxBody content={content}/>
                    <QuestionBoxAnswer content={content}/>
                </Card.Body>
                <Card.Footer>
                    <QuestionBoxFooter content={content}/>
                </Card.Footer>
            </Card>
        </Container>
    )
}

function QuestionBoxHeader({content}) {
    return (
        <div className="d-flex justify-content-between">
            <i>{GetQuestionTypeName(content)}</i>
            <Badge pill bg={GetDifficultyColor(content)}>{GetDifficultyName(content)}</Badge>
        </div>
    )
}

function QuestionBoxBody({content}) {
    return (
        <div>
            <p>{content.question}</p>
        </div>
    )
}

function QuestionBoxAnswer({content}) {
    switch (content.type) {
        case 0:
            return <QuestionBoxOneAnswer content={content}/>;
        case 1:
            return <QuestionBoxMultipleAnswer content={content}/>;
        case 2:
            return <QuestionBoxSequenceAnswer content={content}/>;
    }
}

function QuestionBoxFooter({content}) {
    return (
        <div className="d-flex justify-content-end">
            <i>{content.cost} {GetNoun(content.cost, "балл", "балла", "баллов")}</i>
        </div>
    )
}

function QuestionBoxOneAnswer({content}) {
    return (
        <div>
            {content.answer.map((answer, index) => {
                let key = content.hash + "_" + index;
                return (
                        <Card>
                            <Card.Body >
                                {answer}
                            </Card.Body>
                        </Card>
                )
            })}
        </div>
    )
}

function QuestionBoxMultipleAnswer({content}) {
    return (
        <Form>
            {content.answer.map((answer, index) => {
                let key = content.hash + "_" + index;
                return (
                    <div key={key} className={"mb-3"}>
                        <Form.Check
                            type={"checkbox"}
                            id={key}
                            name={content.hash}
                            label={answer}
                        />
                    </div>
                )
            })}
        </Form>
    )
}

function QuestionBoxSequenceAnswer({content}) {
    const [answers, setAnswers] = React.useState(content.answer);

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                {answers.map(language => <SortableItem key={language} id={language}/>)}
            </SortableContext>
        </DndContext>
    )

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setAnswers((items) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                console.log(arrayMove(items, activeIndex, overIndex));
                return arrayMove(items, activeIndex, overIndex);
            });

        }
    }
}

function GetQuestionTypeName(content) {
    switch (content.type) {
        case 0:
            return "Вопрос с выбором одного ответа";
        case 1:
            return "Вопрос с выбором множественного ответа";
        case 2:
            return "Вопрос на установление последовательности";
        case 3:
            return "Вопрос на установление соответствия";
        case 4:
            return "Вопрос на дополнение фразы";
        case 5:
            return "Вопрос с развернутым ответом";
    }
}

function GetDifficultyColor(content) {
    switch (content.difficulty) {
        case 0:
            return "success";
        case 1:
            return "warning";
        case 2:
            return "danger";
    }
}

function GetDifficultyName(content) {
    switch (content.difficulty) {
        case 0:
            return "Легко";
        case 1:
            return "Средне";
        case 2:
            return "Сложно";
    }
}

function GetNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}