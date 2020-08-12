'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return e(
            'button',
            { onClick: () =>
                    window.location.replace(`/login?token=${id_token}`) },
            'Log In'
        );
    }
}
const domContainer = document.querySelector('#loginButtonContainer');
ReactDOM.render(e(LikeButton), domContainer);