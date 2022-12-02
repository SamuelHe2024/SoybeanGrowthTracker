import React from 'react'
import {CircularProgressbar} from "react-circular-progressbar";
import "../App.css"
import "react-circular-progressbar/dist/styles.css"

const Results = (props) => {
    const {accuracy} = props;
    console.log(accuracy)
    const calcColor = (percent, start, end) => {
        let a = percent / 100,
        b = (end - start) * a,
        c = b + start;

        return "hsl(" + c + ", 100% , 50%"
    }
    return (
        <div style={{height: 50}}>
            <CircularProgressbar
                value={accuracy}
                text={`${accuracy}%`}
                styles={{
                    trail: {
                        strokeLinecap: "butt",
                        transofrm: "rotate(-126deg)",
                        transformOrigin: "center center"
                    },
                    path: {
                        strokeLinecap: "butt",
                        transofrm: "rotate(-126deg)",
                        transformOrigin: "center center",
                        stroke: calcColor(accuracy, 0 , 120)
                    },
                    text: {
                        fill: "#ddd",
                    }
                }}
                strokeWidth = {10}
            />
        </div>
    );
};
export default Results