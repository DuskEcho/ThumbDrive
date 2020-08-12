'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button',
            { onClick: () =>
                    window.location.replace(`/login?token=${id_token}`) },
            'Like'
        );
    }
}
const domContainer = document.querySelector('#loginButtonContainer');
ReactDOM.render(e(LikeButton), domContainer);