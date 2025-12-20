export function Options({props}) {
    return (
        <div className="options">
            <div className="option">
                <input type="radio" name="option" id="option1" />
                <label htmlFor="option1" className="font-sans text-gray-900 font-normal">{props.option1}</label>
            </div>
            <div className="option">
                <input type="radio" name="option" id="option2" />
                <label htmlFor="option2" className="font-sans text-gray-900 font-normal">{props.option2}</label>
            </div>
            <div className="option">
                <input type="radio" name="option" id="option3" />
                <label htmlFor="option3" className="font-sans text-gray-900 font-normal">{props.option3}</label>
            </div>
            <div className="option">
                <input type="radio" name="option" id="option4" />
                <label htmlFor="option4" className="font-sans text-gray-900 font-normal">{props.option4}</label>
            </div>
        </div>
    )
}