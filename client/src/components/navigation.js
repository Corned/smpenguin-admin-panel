import smpenguinLogo from "assets/smpenguin-logo.webp"
import styled from "styled-components"

const StyledNav = styled.nav`
  height: 50px;
  margin: 20px 10px;

  display: flex;
  flex-direction: row;
  gap: 20px;
  
  & > * {
    margin: auto 0;
    user-select: none;
  }
`

const Logo = styled.img`
  aspect-ratio: 1;
  height: inherit;
  
  &:hover {
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out; 
  }

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }
`

const Title = styled.span`
  font-size: 26px;
  font-weight: bold;
  font-family: monospace;
`

const Navigation = () => {
  return (
    <StyledNav>
      <Logo src={smpenguinLogo} alt="smpenguin logo"/>
      <Title>SMPenguin Admin Panel</Title>
    </StyledNav>
  )
}

export default Navigation