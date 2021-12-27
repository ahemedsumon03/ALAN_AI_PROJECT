import React, {useEffect, useState, createRef} from 'react';
import {Card, CardActions, CardActionArea, CardMedia, CardContent, Button, Typography} from '@material-ui/core';
import useStyle from './style';

const NewsCard = ({ article:{ description, publishedAt, source, title, url, urlToImage}, i, activeArticles}) => {

    const classes = useStyle();
    const [elRef,setelRef] = useState([]);
    const scrollTop = (ref)=>window.scroll(0,ref.current.offsetTop);

    useEffect(()=>{
        window.scroll(0,0);
        setelRef((ref)=>Array(20).fill().map((_,j)=>ref[j] || createRef()));
    },[]);

    useEffect(()=>{
        if(i === activeArticles && elRef[activeArticles])
        {
            scrollTop(elRef[activeArticles]);
        }
    },[i,activeArticles,elRef]);

    return (
        <Card ref={elRef[i]} className={activeArticles === i ? classes.activeCard : classes.card}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title}/>
                    <div className={classes.details}>
                        <Typography variant="body2" color='textSecondary' component="h2">{new Date(publishedAt).toDateString()}</Typography>
                        <Typography variant="body2" color='textSecondary' component="h2">{source.name}</Typography>
                    </div>
                    <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color='textSecondary' component="p">{description}</Typography>
                    </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' href={url}>Learn More</Button>
                <Typography variant="h5" color='textSecondary'>{i+1}</Typography>
            </CardActions>
        </Card>
    );
};

export default NewsCard;