import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
       {
        /* link 컴포넌트들이 렌더링되면 a태그로 변하기 때문 */
      }
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("AllCoins", fetchCoins);
  // const [coins, setCoins] = useState<ICoin[]>([]); // ([]) => default로 빈 array가 지정된 것
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //     // fetch("https://api.coinpaprika.com/v1/coins");
  //     (async () => { // ()(); 구문으로 만들어진 함수는 즉시 바로 실행
  //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //         const json = await response.json();
  //         setCoins(json.slice(0, 100));
  //         setLoading(false);
  //     })();
  // }, []); // [] => component life의 시작점에서 한번만 실행하도록 설정
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading ...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name }, // 화면 전환 시 유저는 loading 창을 보지 않아도 됨
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
