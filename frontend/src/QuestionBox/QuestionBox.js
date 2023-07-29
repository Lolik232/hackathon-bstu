import React from "react";
import {Badge, Card, Container} from "react-bootstrap";
import {MatchAnswer} from "../Answer/MatchAnswer";
import {makeCheckable, makeIndexed, makeRef} from "../List/List";
import {SingleAnswer} from "../Answer/SingleAnswer";
import {MultipleAnswer} from "../Answer/MultipleAnswer";
import {SequenceAnswer} from "../Answer/SequenceAnswer";

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

export function QuestionBox({content, onChanged}) {
    const handleOnChanged = (answer) => {
        onChanged({id: content.hash, answer: answer})
    }

    return (
        <Container className="CardBox">
            <Card>
                <Card.Header>
                    <QuestionBoxHeader content={content}/>
                </Card.Header>
                <Card.Body>
                    <QuestionBoxBody content={content}/>
                    <QuestionBoxAnswer content={content} onChanged={handleOnChanged}/>
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
            <Badge className={"DifficultyBadge"} pill
                   bg={GetDifficultyColor(content)}>{GetDifficultyName(content)}</Badge>
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

function QuestionBoxAnswer({content, onChanged}) {
    const handleOnChanged = (answer) => {
        onChanged(answer);
    }

    switch (content.type) {
        case 0:
            return <SingleAnswer list={content.answer} onChanged={handleOnChanged}/>;
        case 1:
            return <MultipleAnswer list={content.answer} onChanged={handleOnChanged}/>;
        case 2:
            return <SequenceAnswer list={content.answer} onChanged={handleOnChanged}/>;
        case 3:
            return <MatchAnswer staticList={content.answer.staticList}
                                draggableList={content.answer.draggableList}
                                onChanged={handleOnChanged}/>
    }
}

function QuestionBoxFooter({content}) {
    return (
        <div className="d-flex justify-content-end">
            <i>{content.cost} {GetNoun(content.cost, "балл", "балла", "баллов")}</i>
        </div>
    )
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