import React from 'react'
import "../App.css"
import "react-circular-progressbar/dist/styles.css"

const Results = (props) => {
    const {accuracy} = props;
    console.log(accuracy)
    return (
        <div style={{height: 50}}>
        </div>
    );
};
export default Results