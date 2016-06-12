import React from 'react';
import {validateEmail} from '../utils/validator'

class NewsletterSignup extends React.Component {
    constructor() {
        super()
        this.onClickSubscribe = this.onClickSubscribe.bind(this);
        this.state = {
            buttonText: 'Subscribe',
            inputClassName: ''
        }
    }

    onClickSubscribe() {
        const { onSubscribe} = this.props;
        if (!validateEmail(this.refs.email.value)) {
            this.setState({ inputClassName: 'Invalid', buttonText: 'Invalid E-mail' });
            setTimeout(() => this.setState({ inputClassName: '', buttonText: 'Subscribe' }), 3000)

        } else {
            onSubscribe(this.refs.email.value);
            this.refs.email.value = '';
            this.setState({ inputClassName: 'Valid', buttonText: 'Thanks!' });
            setTimeout(() => this.setState({ inputClassName: '', buttonText: 'Subscribe' }), 3000)
        }
    }

    render() {
        const { buttonText, inputClassName } = this.state;
        return (
            <div className="newsletter">
                <input type="email" placeholder="SIGN UP FOR OUR NEWSLETTER" ref="email" className={inputClassName} />
                <button onClick={this.onClickSubscribe}>{buttonText}</button>
            </div>
        )
    }
}

NewsletterSignup.propTypes = {
    onSubscribe: React.PropTypes.func
};

NewsletterSignup.defaultProps = {
    onSubscribe: () => {  }
};

export default NewsletterSignup

