import {FormControl} from "react-bootstrap";

export const ComplementAnswer = ({answerRef}) => {
    const handleOnChanged = (event) => {
        answerRef.ref = event.target.value;
    }

    return <FormControl as="input" onChange={handleOnChanged} placeholder={"Дополните фразу..."}/>
}