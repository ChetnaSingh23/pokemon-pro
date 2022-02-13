import React from 'react';
import { Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface TypesPropType {
    types: any;
}

const useStyles = makeStyles({
    chip: {
        marginRight: '10px',
        textTransform: 'uppercase',
        color: 'white',
    }
});

export default function Types({ types }: TypesPropType) {
    const classes = useStyles();

    return (
        <>
            {types.length ? types.map((type: any, i: number) => {
                return (
                <Chip 
                    className={classes.chip}
                    label={type}
                    style={{backgroundColor: `grey` }}
                />
                )})
              : ''
            }
        </>
    )
};