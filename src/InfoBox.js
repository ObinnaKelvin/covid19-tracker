import React from 'react';
import { Card, CardContent, Typography} from "@material-ui/core"
import "../src/css/InfoBox.css";

function InfoBox({title, cases, isRed, total, color, active, ...props}) { /* Onclick is in the ...props */
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick = {props.onClick}>
            <CardContent>
                {/* Title i.e Coronavirus Cases */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* +120k Number of Cases */}
                <h2 
                    className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`} 
                    // style={{color: color}}
                >
                    {cases}

                </h2>
                {/* 1.2M Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
