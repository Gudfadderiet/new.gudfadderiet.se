import './css/Post.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import data from '../posts.json';

import Parser from 'html-react-parser';

function replaceWords(string) {
    let str = string.replace(/N0llan/g, "<span className=\"Theme-Nollan\">N0llan</span>");
    str = str.replace(/n0llan/g, "<span className=\"Theme-Nollan\">N0llan</span>");
    str = str.replace(/Gudfadderiet/g, "<span className=\"Theme\">Gudfadderiet</span>");
    str = str.replace(/Generalen/g, "<span className=\"Theme\">Generalen</span>");
    return str;
}

function getJsonObject(jsonList, attribute, value) {
    for (let i = 0; i < jsonList.length; i++) {
      if (jsonList[i][attribute] === value) {
        return jsonList[i];
      }
    }
    return null;
}

function Post() {
    let { id } = useParams();

    const [post, setPost] = useState(undefined);

    useEffect(() => {
        setPost(getJsonObject(data, "slug", id));
    }, []);

    return (
      <div className="Post">
        {
            post ?
            <div>
                <h1 className='Post-Title'>{Parser(replaceWords(post.title))}</h1>
                <h2 className='Post-Subtitle'>av {Parser(replaceWords(post.author))} ({post.date})</h2>
                <p>{Parser(replaceWords(post.description))}</p>
                {
                    post.imgurl ? <img src={post.imgurl} alt={"img"}/> : <></>
                }
            </div>
            :
            <>
            </>
        }
      </div>
    );
}
  
export default Post;