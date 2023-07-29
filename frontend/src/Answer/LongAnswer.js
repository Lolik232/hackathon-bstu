import {FormControl} from "react-bootstrap";

export const LongAnswer = ({onChanged}) => {
    const handleOnChanged = (event) => {
        onChanged(event.target.value)
    }

    return <FormControl as="textarea" onChange={handleOnChanged} placeholder={"Напишите развернутый ответ..."}/>
}