import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import VCERNTypography from './elements/VCERNTypography';
import { useHistory } from 'react-router-dom';

import { getFormattedDate } from '../common/helper';

const useStyles = makeStyles({
    root: { maxWidth: 340 },
    boldText: { fontWeight: 'bold' },
    title: { fontWeight: 'bold', margin: '10px 0' },
    body: { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': 3, '-webkit-box-orient': 'vertical' },
});

export default function ImgMediaCard({ blog }) {
    const { image, title, description } = blog;
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} onClick={() => history.push('/blog', { ...blog })}>
            <CardActionArea>
                <CardMedia component="img" alt="Blog Image" height="250" image={image} title={title} />
                <CardContent>
                    <VCERNTypography variant="h6" className={classes.title} value={title} />
                    <VCERNTypography variant="body2" className={classes.body} value={description} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
