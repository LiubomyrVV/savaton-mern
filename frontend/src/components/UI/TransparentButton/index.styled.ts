import styled from 'styled-components';

interface ButtonProps {
    typebtn?: 'standard' | 'active' | 'disabled';
}

export const TransparentButtonContainer = styled.button<ButtonProps>`
    cursor: ${({ typebtn }) => (typebtn === 'disabled' ? 'not-allowed' : 'pointer')};
    background: transparent;
    border: 2px solid;
    border-radius: 12px;
    border-color: ${({ typebtn }) => 
        typebtn === 'active' ? 'red' : 
        typebtn === 'disabled' ? 'gray' : 
        'black'};
    color: ${({ typebtn }) => 
        typebtn === 'active' ? 'red' : 
        typebtn === 'disabled' ? 'gray' : 
        'black'};
    padding: 10px 16px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        opacity: ${({ typebtn }) => (typebtn === 'disabled' ? '1' : '0.7')};
    }

    span {
        display: inline-block;
    }
`;
