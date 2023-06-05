import styled from 'styled-components';

export default function Section() {
    return (
        <SectionDiv>
            <h1>Section **</h1>
        </SectionDiv>
    );
}

const SectionDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: pink;
    height: 100vh;
`;
