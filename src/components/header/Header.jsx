import React, { PureComponent } from 'react'

export default class Header extends PureComponent {
    render() {
        let { hasToken, title, onClick, toggleModal } = this.props;
        return (
            <div>
                <h1>
                    <a href="/">
                        {title}
                    </a>

                </h1>
                <div className="navigation-header">
                    <button onClick={onClick}>{hasToken ? 'Log ud' : 'Log ind'}</button>
                    {
                        hasToken
                        &&
                        <button onClick={toggleModal}>Opret job</button>
                    }

                </div>
            </div>

        )
    }
}
