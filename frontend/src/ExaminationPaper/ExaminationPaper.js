import {Badge, Card, Container} from "react-bootstrap";
import React from "react";
import {GetNoun} from "../Utility/Utility";
import {AnswerListRefContext} from "../AnswerList/AnswerListRefContext";
import {makeRef} from "../List/List";
import {inRef, makeInAnswerListCheckable} from "../Utility/InHelpers";
import {MultipleAnswerList} from "../AnswerList/MultipleAnswerList";

export function MultipleAnswerExaminationPaper({
                                                   questionText,
                                                   annotationText,
                                                   answerList,
                                                   difficulty,
                                                   cost,
                                                   hash
                                               }) {
    return ExaminationPaper({
        typeName: "Вопрос с выбором множественного ответа",
        questionText: questionText,
        annotationText: annotationText,
        answerListRef: inRef(makeInAnswerListCheckable(answerList)),
        answerComponent: <MultipleAnswerList/>,
        difficulty: difficulty,
        cost: cost,
        hash: hash,
        type: 1
    });
}


function ExaminationPaper({
                              typeName,
                              questionText,
                              annotationText,
                              answerListRef,
                              answerComponent,
                              difficulty,
                              cost,
                              hash,
                              type,
                              getBeautifulAnswer
                          }) {
    return ({
        body: (
            <Container className="CardBox">
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <i>{typeName}</i>
                        <Badge className={"DifficultyBadge"} pill
                               bg={GetDifficultyColor(difficulty)}>{GetDifficultyName(difficulty)}</Badge>
                    </Card.Header>
                    <Card.Body>
                        <p>{questionText}</p>
                        <i className={"Annotation"}>
                            Пояснение: {annotationText === "" || annotationText === undefined || annotationText === null
                            ? "нет"
                            : annotationText}
                        </i>
                        <AnswerListRefContext.Provider value={answerListRef}>
                            {answerComponent}
                        </AnswerListRefContext.Provider>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end">
                        <i>{cost} {GetNoun(cost, "балл", "балла", "баллов")}</i>
                    </Card.Footer>
                </Card>
            </Container>
        ),
        answerRef: answerListRef,
        id: hash,
        type: type,
        getBeautifulAnswer: getBeautifulAnswer
    })
}

function GetDifficultyColor(difficulty) {
    switch (difficulty) {
        case 0:
            return "success";
        case 1:
            return "warning";
        case 2:
            return "danger";
    }
}

function GetDifficultyName(difficulty) {
    switch (difficulty) {
        case 0:
            return "Легко";
        case 1:
            return "Средне";
        case 2:
            return "Сложно";
    }
}