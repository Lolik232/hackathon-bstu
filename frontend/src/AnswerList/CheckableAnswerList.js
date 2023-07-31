import React from "react";
import {AnswerListRefContext} from "./AnswerListRefContext";
import {ListGroup} from "react-bootstrap";
import {makeRef} from "../List/List";

export function CheckableAnswerList() {
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
    const answerListRef = React.useContext(AnswerListRefContext);

    function toggleAnswer(i) {
        answerListRef.ref[i].value = !answerListRef.ref[i].value;
        forceUpdate();
    }

    return (
        <ListGroup>
            {answerListRef.ref.map((answer, index) => {
                return (
                    <ListGroup.Item
                        key={index}
                        variant={answer.checked ? "primary" : "light"}
                        onClick={() => {
                            toggleAnswer(index);

                        }}
                    >
                        {answer.value}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}