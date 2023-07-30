import {ListGroup} from "react-bootstrap";

export function StaticAnswerList({answerListRef}) {
    return (
        <ListGroup>
            {answerListRef.ref.map((answer, index) => {
                return (
                    <ListGroup.Item key={index}>
                        {answer.value}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}