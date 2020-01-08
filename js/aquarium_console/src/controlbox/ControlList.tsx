import React from 'react';
import LightControl from '../lighting/LightControl';
import GPSFinder from '../circadian/GPSFinder';


class ControlList extends React.Component<{}, {}> {
    public render() {
        return(
            <React.Fragment>
               <LightControl />
               <GPSFinder />
            </React.Fragment>
        )
    }
}

export default ControlList;