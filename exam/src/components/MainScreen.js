import React from 'react';
import Location from './Location';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { locationList } = this.props;
        return (
            <div className="main-screen-div">
                <div className="main-top-div">
                    <button className="main-top-button" type="button" onClick={null}>

                    </button>
                    <p className="main-top-text">Location list</p>
                </div>

                <div className="main-list-wrap">
                    {locationList.map((item, index) => (
                        <li key={item.id}>
                        <Location
                            item={item}
                        />
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}

export default MainScreen;
