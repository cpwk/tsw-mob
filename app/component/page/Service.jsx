import React from 'react'
import '../../assets/css/page/service.scss'
import U from "../../common/U";

export default class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        U.setWXTitle('服务');
    }

    render() {
        return <div className='service-page'/>
    }
}