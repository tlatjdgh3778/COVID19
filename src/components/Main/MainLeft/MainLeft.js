import React from 'react';
import styled, {css} from 'styled-components';
import CityStatus from './CityStatus/CityStatus';

const MainLeftContainer = styled.div`

margin-right: 6rem;
color: ${(props) => props.theme.color.fontColor};


    @media ${(props) => props.theme.device.TabletLandscape}{
        margin: 1rem;
    }
    @media ${(props) => props.theme.device.TabletPortrait}{
        display: flex;
        flex-direction: column;
        margin: 0;
        width: 85%;
        /* min-width: 100%; */
    }
`;

const DomesticStatusTitle = styled.div`
margin: 1rem;
padding-bottom: 1rem;
font-size: ${(props) => props.theme.fontSize.lg};
border-bottom: 1px solid ${(props) => props.theme.color.fontColor};
`;
const DomesticStatusContainer = styled.div`
display: flex;
margin: 0 1rem;
justify-content: space-between;
`;

const container = css`
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
/* margin: 0 1rem; */
padding: 0.5rem 1rem;
width: 4rem;
height: 5rem;
justify-content: space-between;
cursor: default;

    &:hover{
        background-color: ${(props) => props.theme.color.hoverColor};
    }

    @media ${(props) => props.theme.device.TabletPortrait}{
            margin: 0;
        }
    @media ${(props) => props.theme.device.MobileLandscape}{
        width: 3rem;
        height: 4rem;
        padding: 0.25rem;
    }
        
`;

const TotalContainer = styled.div`
${container};
`;

const Title = styled.div`
    @media ${(props) => props.theme.device.TabletPortrait}{
        font-size: ${(props) => props.theme.fontSize.ssm};
    }
`;
const Data = styled.div`
font-size: ${(props) => props.theme.fontSize.lg};
font-weight: 700;

    @media ${(props) => props.theme.device.TabletPortrait}{
        font-size: ${(props) => props.theme.fontSize.md};
    }
    @media ${(props) => props.theme.device.MobileLandscape}{
        font-size: ${(props) => props.theme.fontSize.sm};
    }
`;
const TodayData = styled.div`
display: flex;
    @media ${(props) => props.theme.device.TabletPortrait}{
        font-size: ${(props) => props.theme.fontSize.ssm};
    }
`;

function MainLeft({koreaData, cityData}) {
// 누적 확진자 : TotalCase, city_url.korea.newCase
// 격리해제(완치) : TotalRecovered, TodayRecovered
// 격리중(치료중) : NowCase, TotalCaseBefore
// 사망자 수 : TotalDeath, TodayDeath
    const names = ['확진환자', '치료중', '격리해제', '사망자'];

    return(
        <MainLeftContainer>
            <DomesticStatusTitle>국내현황</DomesticStatusTitle>
            <DomesticStatusContainer>
                {names.map((name, i)=>{
                    return(
                        <TotalContainer key={i}>
                            {koreaData === undefined || cityData === undefined?
                            <div>loading animation</div>
                            :
                            <>
                            <Title>{name}</Title>
                            {name==='확진환자'?
                            <>
                            <Data>
                            {koreaData.TotalCase}
                            </Data>
                            <TodayData>
                            <div>{cityData.korea.newCase}</div>
                            <div>{cityData.korea.newCase>0?'+':'-'}</div>
                            </TodayData>
                            </>
                            :
                            (
                                name==='치료중'?
                                <>
                                <Data>
                                {koreaData.NowCase}
                                </Data>
                                <TodayData>
                                <div>{koreaData.TotalCaseBefore}</div>
                                <div>{koreaData.TotalCaseBefore>0?'+':'-'}</div>
                                </TodayData>
                                </>
                                :
                                (
                                    name==='격리해제'?
                                    <>
                                    <Data>
                                    {koreaData.TotalRecovered}
                                    </Data>
                                    <TodayData>
                                    <div>{koreaData.TodayRecovered}</div>
                                    <div>{koreaData.TodayRecovered>0?'+':'-'}</div>
                                    </TodayData>
                                    </>
                                    :
                                    <>
                                    <Data>
                                    {koreaData.TotalDeath}
                                    </Data>
                                    <TodayData>
                                    <div>{koreaData.TodayDeath}</div>
                                    <div>{koreaData.TodayDeath>0?'+':'-'}</div>
                                    </TodayData>
                                    </>
                                )
                            )}
                            </>}
                        </TotalContainer>
                    )
                })}
                
            </DomesticStatusContainer>
            <CityStatus cityData={cityData}></CityStatus>
        </MainLeftContainer>
    );
}

export default MainLeft;

// <Data>
// {name==='확진환자'?koreaData.TotalCase:
// (
//     name==='검사중'?koreaData.TotalRecovered:
//     (
//         name==='격리해제'?koreaData.NowCase:koreaData.TotalDeath
//     )
// )}
// </Data>