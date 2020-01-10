import React from 'react'
import '../../assets/css/page/contact.scss'
import U from "../../common/U";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        U.setWXTitle('联系');
    }

    render() {
        return <div className='contact-page'/>
    }
}