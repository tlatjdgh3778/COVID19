import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WorldStatus from './WorldStatus/WorldStatus';

const MainRightContainer = styled.div`
color: ${(props) => props.theme.color.fontColor};
margin: 1rem;
min-height: 60rem;

    @media ${(props) => props.theme.device.TabletLandscape}{
        width: 90%;
    }
    @media ${(props) => props.theme.device.TabletPortrait}{
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        width: 85%;
        /* min-width: 100%; */
    }
`;

function WorldRight({countriesData}) {
    const url = 'https://disease.sh/v3/covid-19/countries';

    // const getCountriesData = async () => {
    //     const response = await fetch(url);

    //     const data = await response.json();

    //     console.log(data);
    //     setCountries(data);
    // }

    // useEffect(()=>{
    //     getCountriesData();
    // }, [])
    return(
        <MainRightContainer>
            <WorldStatus countriesData={countriesData}></WorldStatus>
        </MainRightContainer>
    )
}

export default WorldRight;