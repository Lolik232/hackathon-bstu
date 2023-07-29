import {FormControl} from "react-bootstrap";

export const ComplementAnswer = ({onChanged}) => {
    const handleOnChanged = (event) => {
        onChanged(event.target.value)
    }

    return <FormControl as="input" onChange={handleOnChanged} placeholder={"Дополните ответ..."}/>
}