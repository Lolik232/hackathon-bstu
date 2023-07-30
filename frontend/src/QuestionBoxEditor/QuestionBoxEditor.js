import './../App.css';
import AppHeader from "../Header/AppHeader";
import AppFooter from "../Footer/AppFooter";
import {EditableQuestionBox} from "../QuestionBox/EditableQuestionBox";

export const QuestionBoxEditor = () => {
    return (<div>
        <AppHeader/>
        <div className={"Content"}>
            <EditableQuestionBox/>
        </div>
        <AppFooter/>
    </div>)
}