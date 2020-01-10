import React from 'react'
import U from "../../common/U";
import {App} from "../../common";
import '../../assets/css/page/custcase.scss'

export default class Custcase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            custcase: {}
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        let {id} = this.state;
        App.api('/usr/home/custcase', {id}).then((custcase) => {
            U.setWXTitle(custcase.title);
            this.setState({
                custcase
            });
        });
    };

    render() {

        let {custcase = {}} = this.state;

        let {title, subtitle, context, customer, industry, service, content} = custcase;

        if (!title) {
            return <div/>
        }

        return <div className='custcase-page'>

            <div className='case-info'>
                <div className='title'>{title}</div>
                <div className='subtitle'>{subtitle}</div>
                <div className='line'>项目背景</div>
                <div className='line'>{context}</div>
                <br/>
                <div className='line'>客户：{customer}</div>
                <div className='line'>行业：{industry}</div>
                <div className='line'>服务：{service}</div>
            </div>
            <div className='content'>
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </div>
            <div className='clearfix'/>
        </div>

    }
}