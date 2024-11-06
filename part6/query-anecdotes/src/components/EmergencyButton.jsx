import styled from 'styled-components';

const Button = () => {

  const reload = ()=>{
    location.reload(true)
  }

  return (
    <StyledWrapper>
      <div className="background-button">
        <button onClick={reload} className="button">
          EMERGENCY
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .background-button {
    background: repeating-linear-gradient(
      45deg,
      #3c2209 0 20px,
      #ff9c00 20px 40px
    );
    width: 10em;
    height: 10em;
    -webkit-box-shadow: 15px 15px 50px 5px #5f5f5f;
    box-shadow: 15px 15px 50px 5px #5f5f5f;
    position: relative;
    display: inline-block;
    outline: 2px solid black;
  }

  .background-button::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    height: 70%;
    background: #a0b8c4;
    border: 2px solid #3c2209;
  }

  .button {
    background: #cc2a1f;
    width: 65%;
    height: 65%;
    border-radius: 50%;
    position: absolute;
    top: 7.5%;
    left: 18.25%;
    color: white;
    font-size: 1em;
    font-weight: 900;
    font-family: 'Courier New', Courier, monospace;
    -webkit-box-shadow: 0 15px 0 0 #842a2a;
    box-shadow: 0 15px 0 0 #842a2a;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    border: 2px solid black;
  }

  .button:active {
    -webkit-box-shadow: 0 1px 1px 1px #8C0606;
    box-shadow: 0 1px 1px 1px #8C0606;
    top: 15%;
  }

  .background-button:has(.button:active) + .emergency {
    display: block;
    -webkit-transform: rotate(0deg) scaleY(1);
    -ms-transform: rotate(0deg) scaleY(1);
    transform: rotate(0deg) scaleY(1);
    -webkit-animation: anims 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
    animation: anims 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  @keyframes anims {
    0% {
      -webkit-transform: rotate(-30deg) scaleY(0.25);
      transform: rotate(-30deg) scaleY(0.25);
    }

    100% {
      -webkit-transform: rotate(0deg) scaleY(1);
      transform: rotate(0deg) scaleY(1);
    }
  }

  .emergency {
    position: absolute;
    display: none;
  }`;

export default Button;
