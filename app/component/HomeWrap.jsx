import React from 'react';

import NavLink from '../common/NavLink.jsx'

import '../assets/css/common.scss'
import '../assets/css/page/home-wrap.scss'

export default class HomeWrap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return <div className='home-wrap'>
            <Header/>
            <div className='inner-page'>
                {this.props.children}
            </div>

            <Footer/>
        </div>
    }
}

const menus = [{cn: '首页', en: 'HOME', path: '/'}, {cn: '关于', en: 'ABOUT', path: '/about'}, {
    cn: '案例', en: 'CASE', path: '/custcases'
}, {cn: '思想', en: 'THOUGHT', path: '/thought'}, {cn: '服务', en: 'SERVICE', path: '/service'}, {
    cn: '动态', en: 'DYNAMIC', path: '/articles'
}, {cn: '联系', en: 'CONTACT', path: '/contact'}];

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.menuClick(true);
            window.scrollTo(0, 0);
        });
    }

    menuClick = (force) => {
        this.setState({open: force ? false : !this.state.open});
    };

    render() {
        let {open} = this.state;

        return <div className="top-header">
            <a href='/'>
                <div className="logo"/>
            </a>

            <div className='icon-menu' onClick={() => this.menuClick()}/>

            {open && <div className='open-menu'>
                <ul>
                    {menus.map((menu, index) => {
                        let {key, cn, en, path} = menu;
                        return <li key={index}>
                            <NavLink to={path}>{cn}</NavLink>
                        </li>
                    })}
                </ul>
            </div>}

        </div>

    }
}

class Footer extends React.Component {
    render() {
        return <div className="footer"/>
    }
}
