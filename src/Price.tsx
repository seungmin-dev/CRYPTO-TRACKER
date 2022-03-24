import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IPrice {
  coinId: string;
}

const PercentChangeBox = styled.div`
  display: flex;
  background-color: rgba(0,0,0,0.5);
  padding: 10px 20px;
  border-radius: 10px;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PercentChangeTitle = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
`;

const PercentChange = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const AthTitle = styled.div`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.accentColor};
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 12px;
    text-align: center;
`;

const Ath = styled.div`
    color: ${(props) => props.theme.textColor};
`;

function Price({ coinId }: IPrice) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Price ... "
      ) : (
        <>
        <PercentChangeBox>
          <PercentChangeTitle>Percent Change 15m</PercentChangeTitle>
          <PercentChange>{data?.quotes.USD.percent_change_15m} %</PercentChange>
        </PercentChangeBox>
        <PercentChangeBox>
          <PercentChangeTitle>Percent Change 30m</PercentChangeTitle>
          <PercentChange>{data?.quotes.USD.percent_change_30m} %</PercentChange>
        </PercentChangeBox>
        <PercentChangeBox>
          <PercentChangeTitle>Percent Change 1h</PercentChangeTitle>
          <PercentChange>{data?.quotes.USD.percent_change_1h} %</PercentChange>
        </PercentChangeBox>
        <PercentChangeBox>
          <PercentChangeTitle>Percent Change 6h</PercentChangeTitle>
          <PercentChange>{data?.quotes.USD.percent_change_6h} %</PercentChange>
        </PercentChangeBox>
        <PercentChangeBox>
          <PercentChangeTitle>Percent Change 12h</PercentChangeTitle>
          <PercentChange>{data?.quotes.USD.percent_change_12h} %</PercentChange>
        </PercentChangeBox>
        <PercentChangeBox>
          <PercentChangeTitle>Percent Change 24h</PercentChangeTitle>
          <PercentChange>{data?.quotes.USD.percent_change_24h} %</PercentChange>
        </PercentChangeBox>
        <AthTitle>All Time High</AthTitle>
        <PercentChangeBox>
            <Ath>{data?.quotes.USD.ath_date}</Ath>
            <Ath>${data?.quotes.USD.ath_price.toFixed(2)}</Ath>
        </PercentChangeBox>
        </>
      )}
    </div>
  );
}

export default Price;
