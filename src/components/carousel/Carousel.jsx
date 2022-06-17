import React, { useState, useEffect } from "react";
import { ReactComponent as PrevIcon } from '../../assets/icons/angle-left.svg';
import { ReactComponent as NextIcon } from '../../assets/icons/angle-right.svg';

import './Carousel.scss';
const Carousel = ({
    slides, infinite,
}) => {
    const [slideData, setSlideData] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [current, setCurrent] = useState(0);

    const [leftEnd, setLeftEnd] = useState(false);
    const [rightEnd, setRightEnd] = useState(false);
    
    const [enableReset, setEnableReset] = useState(false);
    
    const length = slideData.length;

    useEffect(() => {
        if (!infinite) {
            const rEnd = isRightEnd();
            setRightEnd(rEnd);

            const lEnd = isLeftEnd();
            setLeftEnd(lEnd);
        }else{
            const rEnd = isRightEnd();
            setEnableReset(true);
        }

    }, [current]);

    const next = () => {
        if (infinite) {
            setCurrent(current + 1);
            // setEnableReset(false);
        } else {
            setCurrent(current + 1);
        }

    };

    const prev = () => {
        if (infinite) {

        } else {
            setCurrent(current - 1);
        }
    };


    const isRightEnd = () => {
        return current === length - 1;
    }

    const isLeftEnd = () => {
        return current === 0;
    }


    async function fetchData() {
        const res = await fetch(`http://localhost:3600/api/carousel?slides=${slides}`);
        res
            .json()
            .then(res => {
                setSlideData(res);
                setLoaded(true);
            })
        // .catch(err => setErrors(err));
        console.log('slides ', slides);
        console.log('infinite ', infinite);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        loaded && (
            <div class="carousel">

                {slideData.map((slide, index) => {
                    return (
                        //carousel-item  carousel-item-visible
                        <div key={index} className={`carousel-item ${(current === index) ? 'carousel-item-visible' : ''}`}>
                            {
                                <img src={slide.image} />
                            }
                        </div>
                    );
                })}

                <div class="carousel-actions">
                    <button id="carousel-button-prev" onClick={prev} disabled={leftEnd}>
                        {current}
                        <PrevIcon alt="edit-button" className="prev-icon" />
                    </button>
                    <button id="carousel-button-next" onClick={next} disabled={rightEnd}>
                        <NextIcon alt="edit-button" className="next-icon" />
                    </button>
                </div>
            </div>
        ));
};

export default Carousel;
