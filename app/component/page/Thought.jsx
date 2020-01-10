import React from 'react'
import '../../assets/css/page/thought.scss'
import U from "../../common/U";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        U.setWXTitle('思想');
    }

    render() {
        return <div className='thought-page'/>
    }
}