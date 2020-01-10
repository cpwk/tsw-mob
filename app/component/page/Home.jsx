import React from 'react'
import U from "../../common/U";
import {App, CTYPE} from "../../common/index";
import {Banners, Custevals} from "../Comps";

import '../../assets/css/page/home.scss'
import {ArticleList} from "./Articles";
import {CustcaseList, TopCaseList} from "./Custcases";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            banners: [],
        }
    }

    componentDidMount() {
        U.setWXTitle('首页');
        this.loadData();
    }

    loadData = () => {
        App.api('/usr/home/home', {platform: 'mob'}).then((data) => {
            this.setState({data})
        });

        App.api('/usr/home/banners', {bannerQo: JSON.stringify({type: 2})}).then((banners) => {
            this.setState({banners})
        });
    };

    render() {

        let {data = {}, banners = []} = this.state;

        let {topCases = [], articles = []} = data;


        return <div className='home-page'>

            {banners.length > 0 && <Banners banners={banners} type={CTYPE.bannerTypes.HOME}/>}

            <div className='focus' onClick={() => App.go('/service')}/>

            <div className='dong'/>

            <div className='cases-header-home'/>

            <TopCaseList list={topCases}/>

            <CustcaseList offtop={2}/>

            <ArticleList list={articles} type='home'/>

            <div className='coop'/>

            <Custevals limit={4}/>

            <div className='renke'/>

        </div>

    }
}

