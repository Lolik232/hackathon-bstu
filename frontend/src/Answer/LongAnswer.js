import {FormControl} from "react-bootstrap";

export const LongAnswer = ({answerRef}) => {
    const handleOnChanged = (event) => {
        answerRef.ref = event.target.value;
    }

    return <FormControl as="textarea" onChange={handleOnChanged} placeholder={"Напишите развернутый ответ..."}/>
}