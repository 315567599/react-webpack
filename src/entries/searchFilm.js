/**
 * Created by Administrator on 2017/9/1.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

class SearchBar extends React.Component {
    constructor(props) {
       super(props);
       this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
       this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleSearchInputChange(e) {
       this.props.onSearchTextChange(e.target.value);
    }

    handleSearchClick(e) {
       e.preventDefault();
       this.props.onSearchClick();
    }

    render() {
       return (
          <form>
              <input type="text" placeholder="search..." value={this.props.searchText} onChange={this.handleSearchInputChange}/>
              <input type="submit"  value="submit" onClick={this.handleSearchClick}/>
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
            films:[]
        };
        this.handleSearchTextInput = this.handleSearchTextInput.bind(this);
        this.fetchFilms = this.fetchFilms.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);

    }

    handleSearchTextInput(searchText) {
        this.setState({
            searchText:searchText
        });
    }

    handleSearchClick() {
        let url =`http://localhost:8080/douban/v2/movie/search?q=${encodeURI(this.state.searchText)}`;
        this.fetchFilms(url);
    }

    componentDidMount() {
        let url =`http://localhost:8080/douban/v2/movie/search?q=${encodeURI(this.state.searchText)}`;
        this.fetchFilms(url);
    }

    fetchFilms(url) {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result.subjects);
                this.setState({
                    films:result.subjects
                });
            });
    }

    render() {
       return (
           <div>
               <SearchBar
                  searchText = {this.state.searchText}
                  onSearchTextChange = {this.handleSearchTextInput}
                  onSearchClick = {this.handleSearchClick}
               />
               <FilmTable films={this.state.films} />
           </div>
       );
    }
}

var films = [
    {id:1,title:'地心历险记', genres:['刘德华','张学友'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}},
    {id:2,title:'大话西游', genres:['刘德华','张学友'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}},
    {id:3,title:'绿色森林', genres:['刘德华','张学友'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}},
    {id:4,title:'绿色森林2', genres:['刘德华','张学友'], images:{medium:'https://img1.doubanio.com/view/movie_poster_cover/spst/public/p456694917.jpg'}}
];

ReactDOM.render(
    <SearchFilm />,
    document.getElementById('root')
);
