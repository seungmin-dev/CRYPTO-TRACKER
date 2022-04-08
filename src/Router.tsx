import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        $
        <Route path="/:coinId">
          <Header />
          <Coin />
        </Route>
        <Route path="/">
          {" "}
          {/* home */}
          <Header />
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
