import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "./atoms";

const Wrapper = styled.div`
  max-width: 480px;
  margin: 10px auto 0;
  display: flex;
  justify-content: space-between;
`;

const HomeBtn = styled.div`
  font-size: 35px;
  text-align: center;
  background-color: transparent;
  a {
    background-color: transparent;
  }
  $:hover {
    cursor: pointer;
  }
`;

const ModeBtn = styled.div`
  font-size: 30px;
  border: none;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
`;

function Header() {
  const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Wrapper>
      <HomeBtn>
        <Link to={`/`}>🏠</Link>
      </HomeBtn>
      <ModeBtn onClick={toggleDarkAtom}>{darkAtom ? "🌞" : "🌝"}</ModeBtn>
    </Wrapper>
  );
}

export default Header;
