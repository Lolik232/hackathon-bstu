const OneAnswerQuestionBoxName = "Вопрос с выбором одного правильного ответа"
const MultipleAnswerQuestionBoxName = "Вопрос с выбором множественного ответа"
const SequenceAnswerQuestionBoxName = "Установление последовательности"
const MatchAnswerQuestionBoxName = "Установление соответствия"

const AddictionAnswerQuestionBoxName = "Дополение фразы"
const LongAnswerQuestionBoxName = "Развернутый ответ"

export function OneAnswerQuestionBox(props) {
    return (
        <QuestionBox type={OneAnswerQuestionBoxName} difficulty={props.difficulty} condition={props.condition} hash={props.hash} answers={props.answers} cost={props.cost}/>
    )
}


export function QuestionBox(props) {
    return (
        <section>
            <QuestionBoxHeader type={props.type} difficulty={props.difficulty}/>
            <QuestionBoxCondition condition={props.condition}/>
            <QuestionBoxAnswer hash={props.hash} type={props.type} answers={props.answers}/>
            <QuestionBoxFooter cost={props.cost}/>
        </section>
    )
}

function QuestionBoxHeader(props) {
    return (
        <header>
            <div><h3>{props.type}</h3></div>
            <div>{props.difficulty}</div>
        </header>
    )
}

function QuestionBoxCondition(props) {
    return (
        <div>
            <p>{props.condition}</p>
        </div>
    )
}

function QuestionBoxAnswer(props) {
    switch (props.type) {
        case OneAnswerQuestionBoxName:
            return (
                <form>
                    {props.answers.map((obj) =>
                        {
                            return (
                                <>
                                    <input type={"radio"} id={obj} name={props.hash} value={obj}/>
                                    <label for={obj}>{obj}</label>
                                </>
                                )

                        }
                    )}
                </form>
            );
        case MultipleAnswerQuestionBoxName:
            break;
        case SequenceAnswerQuestionBoxName:
            break;
        case MatchAnswerQuestionBoxName:
            break;
        case AddictionAnswerQuestionBoxName:
        case LongAnswerQuestionBoxName:
            break;
    }

}

function QuestionBoxFooter(props) {
    return (
        <footer>
            <div>{props.cost}</div>
        </footer>
    )
}