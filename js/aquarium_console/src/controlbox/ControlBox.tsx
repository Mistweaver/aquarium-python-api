import React from 'react';
import LoginBox from './LoginBox';
import ControlList from './ControlList';

interface ControlBoxProps {}

interface ControlBoxState {
    loggedIn: boolean;
}

class ControlBox extends React.Component<ControlBoxProps, ControlBoxState> {
    constructor(props: ControlBoxProps) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }
    public render() {
        const { loggedIn } = this.state;
        return(
            <React.Fragment>
                {
                    loggedIn ?
                        <LoginBox />
                    :
                        <ControlList />
                }
            </React.Fragment>
        )
    }
}

export default ControlBoxState;