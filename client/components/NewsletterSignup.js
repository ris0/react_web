import React from 'react';

export default class NewsletterSignup extends React.Component {
    constructor() {
        super()
        this.onClickSubscribe = this.onClickSubscribe.bind(this)
        this.state = {
            buttonText: 'Subscribe'
        }
    }

    onClickSubscribe() {
        const { onSubscribe } = this.props

        onSubscribe(this.refs.email.value)
        this.setState({ buttonText: 'Thanks!' })
        this.refs.email.value = ''
        setTimeout(() => this.setState({ buttonText: 'Subscribe' }), 3000)
    }

    render() {
        const { buttonText } = this.state
        return (
            <div className="newsletter">
                <input type="email" placeholder="SIGN UP FOR OUR NEWSLETTER" ref="email" />
                <button onClick={this.onClickSubscribe}>{buttonText}</button>
            </div>
        )
    }
}
