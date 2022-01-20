import React from 'react'
import {Navbar} from "../../components/navbar/Navbar";
import {Featured} from "../../components/featured/Featured";
import {List} from "../../components/list/List";
import "./home.scss";

interface HomeProps {
    type?: 'series' | 'movies'
}

export const Home: React.FC<HomeProps> = ({type}) => {
    return (
        <div className='home'>
            <Navbar />
            <Featured type='movie'/>
            <List />
            <List />
            <List />
            <List />
        </div>
    )
}
