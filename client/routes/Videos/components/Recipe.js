import React from 'react';

function Units(props) {
    const { ingredients } = props

    return (
        <ul>
            { ingredients.map((item, idx) => {
                return (
                    item.unit ?
                            <li className="ingredient-unit" key={idx}>
                                <span>{`${item.amount || 1}`}</span>
                                <span>{` ${item.unit} `}</span>
                            </li> : null
                )
            }) }
        </ul>
    )
}

function Ingredients(props) {
    const { ingredients } = props

    return (
        <ul>
            { ingredients.map((item) => <li key={item.ingredient}>{item.ingredient} </li>) }
        </ul>
    )
}

function Recipe(props) {
    const { instructions, ingredients } = props
    return (
        <section className="recipe">
            <section className="ingredients">
                <h1>Ingredients</h1>
                <Units ingredients={ingredients} />
                <Ingredients ingredients={ingredients} />
            </section>
            <section className="instructions">
                <h1>Instructions</h1>
                {
                    instructions.map((instruction, instructionId) =>
                        <div className="instruction" key={instructionId}>
                            <h2>{instruction.description}</h2>
                            <ol>
                            { instruction.steps.map((step, stepId) => <li key={stepId}>{step}</li>) }
                            </ol>
                        </div>)
                }
            </section>
        </section>
    )
}

Recipe.isRecipe = (video = {}) => {
    return [
        'directions',
        'supplies',
        'recipe'
    ].every((field) => Boolean(video[field]) && Boolean(video[field].length))
}

Recipe.propTypes = {
    instructions: React.PropTypes.array,
    ingredients: React.PropTypes.array
}

Recipe.defaultProps = {
    instructions: [],
    ingredients: []
}

export default Recipe
