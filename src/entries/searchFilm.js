/**
 * Created by Administrator on 2017/9/1.
 * 搜索电影
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

class SearchBar extends React.Component {
    constructor(props) {
       super(props);
       this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    handleSearchInputChange(e) {
       this.props.onSearchTextChange(e.target.value);
    }

    render() {
       return (
          <form>
              <input type="text" placeholder="search..." value={this.props.searchText} onChange={this.handleSearchInputChange}/>
          </form>
       );
    }
}

function FilmRow(props) {
    var genres = props.genres.join(' ');

    return (
       <tr>
           <td>{props.title}</td>
           <td>{props.genres}</td>
           <td><img src= {props.images.medium} /></td>
       </tr>
    );
}


function FilmTable(props) {
    var rows = [];
    props.films.forEach((film) =>{
        rows.push(<FilmRow {...film}  key={film.id}/>)
    });

    return (
       <table>
           <thead>
               <tr>
                   <th>title</th>
                   <th>genres</th>
                   <th>poster</th>
               </tr>
           </thead>
           <tbody>{rows}</tbody>
       </table>
    );
}

class SearchFilm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
        this.fetchFilms = this.fetchFilms.bind(this);

    }

    handleSearchTextInput(searchText) {
        this.setState({
            searchText:searchText
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.fetchFilms()
            .then(res => {
                console.log(res.join());
                return res.json();
            })
            .then(result => {
                console.log(result);
            });
    }

    fetchFilms() {
        let url ='http://localhost:8080/douban/v2/movie/search?q=%E5%9C%B0%E5%BF%83%E5%8E%86%E9%99%A9%E8%AE%B0';
        return fetch(url);
    }

    render() {
       return (
           <div>
               <SearchBar
                  searchText = {this.state.searchText}
                  onSearchTextChange = {this.handleSearchTextInput}
               />
               <FilmTable films={this.props.films} />
           </div>
       );
    }
}

var films = [
    {id:1,title:'地心历险记', genres:['朱茵','李丽珍'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}},
    {id:2,title:'大话三国', genres:['朱茵','李丽珍'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}},
    {id:3,title:'桃色交易', genres:['朱茵','李丽珍'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}}
];

ReactDOM.render(
    <SearchFilm films = {films}/>,
    document.getElementById('root')
);
