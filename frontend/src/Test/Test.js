import './Test.css';
import '../QuestionBox/QuestionBox.css'
import {
    ComplementQuestionBoxWrapper,
    LongQuestionBoxWrapper, MatchQuestionBoxWrapper,
    MultipleQuestionBoxWrapper,
    SequenceQuestionBoxWrapper,
    SingleQuestionBoxWrapper
} from "../QuestionBox/QuestionBox";
import './../App.css';
import AppFooter from "../Footer/AppFooter";
import React from "react";
import AppHeader from "../Header/AppHeader";
import {Button, Container} from "react-bootstrap";
import {makeRef} from "../List/List";

export const Test = ({testName}) => {

    const handleOnSubmit = () => {
        console.log(JSON.stringify(testWrapper.dataRef.ref.map((questionBoxWrapper) => ({
            answer: questionBoxWrapper.getBeautifulAnswer(questionBoxWrapper.answerRef),
            id: questionBoxWrapper.id,
            type: questionBoxWrapper.type
        }))))
    }

    const getQuestionAnswer = ({questionList, indexList}) => {
        let answer = [];
        for (const i in questionList) {
            answer.push({value: questionList[i], index: Number(indexList[i])});
        }

        return answer;
    }

    let jsons = [
        "{\"type\":0,\"question\":\"Сколько?\",\"annotation\":\"легендарная фраза\",\"questionList\":[\"6\",\"Мало\",\"Гоголев\"],\"indexList\":[41,12,37],\"difficulty\":1,\"cost\":1,\"hash\":123}",
        "{\"type\":1,\"question\":\"Сколько?\",\"annotation\":\"легендарная фраза\",\"questionList\":[\"6\",\"Мало\",\"Гоголев\"],\"indexList\":[41,12,37],\"difficulty\":1,\"cost\":1,\"hash\":12312}",
        "{\"type\":2,\"question\":\"Сколько?\",\"annotation\":\"легендарная фраза\",\"questionList\":[\"6\",\"Мало\",\"Гоголев\"],\"indexList\":[41,12,37],\"difficulty\":0,\"cost\":1,\"hash\":3245}",
        "{\"type\":3,\"question\":\"Сколько?\",\"annotation\":\"легендарная фраза\",\"staticList\":[\"6\",\"Мало\",\"Гоголев\"],\"draggableList\":[\"6\",\"Мало\",\"Гоголев\"],\"indexList\":[41,12,37],\"difficulty\":2,\"cost\":7,\"hash\":2435423}",
        "{\"type\":4,\"question\":\"Сколько?\",\"annotation\":\"легендарная фраза\",\"difficulty\":1,\"cost\":1,\"hash\":8907}",
        "{\"type\":5,\"question\":\"Сколько?\",\"annotation\":\"легендарная фраза\",\"difficulty\":2,\"cost\":7,\"hash\":45775}"
    ]

    const addQuestion = ({json}) => {
        const paper = JSON.parse(json.toString());

        const questionBoxWrapperCreator = ({type}) => {
            switch (type) {
                case 0:
                    return SingleQuestionBoxWrapper;
                case 1:
                    return MultipleQuestionBoxWrapper;
                case 2:
                    return SequenceQuestionBoxWrapper;
                case 3:
                    return MatchQuestionBoxWrapper;
                case 4:
                    return ComplementQuestionBoxWrapper;
                case 5:
                    return LongQuestionBoxWrapper;
            }
        }


        testWrapper.dataRef.ref.push(questionBoxWrapperCreator({type: paper.type})({
            question: paper.question,
            answer: paper.type === 3
                ? {
                    static: getQuestionAnswer({
                        questionList: paper.staticList,
                        indexList: paper.indexList
                    }),
                    draggable: getQuestionAnswer({
                        questionList: paper.draggableList,
                        indexList: paper.indexList
                    })
                }
                : paper.type === 4 || paper.type === 5
                    ? ""
                    : getQuestionAnswer({
                        questionList: paper.questionList,
                        indexList: paper.indexList
                    }),
            annotation: paper.annotation,
            difficulty: paper.difficulty,
            cost: paper.cost,
            hash: paper.hash
        }))
    }

    let testWrapper = TestWrapper({testName: testName, onSubmit: handleOnSubmit});

    for (const i in jsons)
        addQuestion({json: jsons[i]})

    return testWrapper.body
}

const TestWrapper = ({testName, onSubmit}) => {
    let questionListRef = makeRef([]);

    const handleOnSubmit = () => {
        onSubmit();
    }

    return ({
        body: <TestBody testName={testName} questionListRef={questionListRef} onSubmit={handleOnSubmit}/>,
        dataRef: questionListRef
    })
}

const TestBody = ({testName, questionListRef, onSubmit}) => {
    const handleOnSubmit = () => {
        onSubmit();
    }

    return (
        <div>
            <AppHeader/>
            <div className={"Content"}>
                <TestBodyHeader testName={testName}/>
                <TestBodyList questionListRef={questionListRef}/>
                <TestBodyFooter onSubmit={handleOnSubmit}/>
            </div>
            <AppFooter/>
        </div>
    )
}

const TestBodyHeader = ({testName}) => {
    return (
        <div>
            <h2>{testName}</h2>
        </div>
    )
}

const TestBodyList = ({questionListRef}) => {
    return (
        <div>
            {questionListRef.ref.map((questionBoxWrapper) => (
                <div className={"CardBox"} key={questionBoxWrapper.id}>
                    {questionBoxWrapper.body}
                </div>))}
        </div>
    )
}

const TestBodyFooter = ({onSubmit}) => {
    const handleOnClick = () => {
        onSubmit();
    }

    return (
        <Container className={"mt-5 mb-5"}>
            <Button onClick={handleOnClick} className={"w-100"}>Завершить тест</Button>
        </Container>
    )
}

export default Test;

