/**
 * Created by Administrator on 2017/8/30.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function Blog(props) {
    const sidebar = (
        <ul>
            {
                props.posts.map((post,index) =>
                    <li key = {post.id}>
                        {post.title}
                    </li>
                )
            }
        </ul>
    );

    const content = props.posts.map((post,index) =>
        <div key={post.id}>
           <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr/>
            {content}
        </div>
    );
}

const posts = [
    {id:1, title:'hello world', content:'welcome to learn react!'},
    {id:2, title:'Installation', content:'you can install react from npm .'},
];

ReactDOM.render(
    <Blog posts={posts}/>,
    document.getElementById('root')
);
