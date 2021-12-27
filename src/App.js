import React, {useEffect, useState} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./NewsCards/NewsCards";
import alanImage from '../src/images/alan.jpg';
import useStyle from './style';
import wordsToNumbers from "words-to-numbers";
const alanKey = `${process.env.REACT_APP_ALAN_KEY}`;

function App() {

    const [news,setNews] = useState([]);
    const [activeArticles,SaveactiveArticles] = useState(-1);
    const classes = useStyle();

    useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand({ command, articles,number }) {
                if(command === 'headLineCommand')
                {
                    console.log(articles);
                    setNews(articles);
                }
                else if(command === 'highlights'){
                    SaveactiveArticles((prevArticles => prevArticles + 1));
                }
                else if(command === 'open'){
                    const parseNumber = number.length > 2 ? wordsToNumbers((number),{fuzzy:true}): number;
                    let article = articles[parseNumber - 1];
                    console.log(article);
                    if(parseNumber > articles.length){
                        alanBtn.playText('Please try that again!');
                    }else if(article)
                    {
                        window.open(article.url,'_blank');
                        alanBtn.playText('Opening...');
                    }
                    else {
                        alanBtn.playText('Please try that again!');
                    }
                }
            }
        })
    },[]);

  return (
    <div>
        <div className={classes.logoContainer}>
            <img src={alanImage} alt="Alan Preview Image" className={classes.alanLogo}/>
        </div>
        <NewsCards article={news} activeArticles={activeArticles}/>
    </div>
  );
}

export default App;
