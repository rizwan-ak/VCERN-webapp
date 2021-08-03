import React, { useEffect } from 'react';
import Slider from 'react-slick';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useState } from 'react';
import VCERNTypography from './elements/VCERNTypography';
import { months } from './data';

import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import { getCurrentMonth } from './helper';

const useStyles = makeStyles(theme => ({
    activeMonth: { color: '#07A7E3', transform: 'scale(1.5)', fontWeight: 'bold' },
    month: { color: '#657285' },
}));

export default function MonthsSlider({ currentMonth, setCurrentMonth }) {
    const classes = useStyles();

    useEffect(() => {
        setCurrentMonth(getCurrentMonth());
    }, []);

    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        nextArrow: <Arrow position={'right'} />,
        prevArrow: <Arrow position={'left'} />,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: getCurrentMonth(),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
        afterChange: next => setCurrentMonth(next),
    };

    return (
        <div>
            <Slider {...settings}>
                {months.map((el, idx) => (
                    <VCERNTypography align="center" variant="body1" key={idx} value={el} className={idx === currentMonth ? classes.activeMonth : classes.month} />
                ))}
            </Slider>
        </div>
    );
}

function Arrow(props) {
    const { className, style, onClick, position } = props;
    const iconStyle = { color: '#07a7e3' };

    return (
        <div className={`${className} ${position === 'left' ? 'slider-left' : 'slider-right'}`} style={{ ...style, display: 'block' }} onClick={onClick}>
            {position === 'left' ? <ChevronLeftIcon fontSize="large" style={iconStyle} /> : <ChevronRightIcon fontSize="large" style={iconStyle} />}
        </div>
    );
}
