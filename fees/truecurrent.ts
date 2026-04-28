import { FetchOptions, SimpleAdapter } from "../adapters/types";
import { CHAIN } from "../helpers/chains";
import { httpGet } from "../utils/fetchURL";

const FEES_URL = `https://bigquery-api-636134865280.europe-west1.run.app/truecurrent_fees`;

const fetch = async (options: FetchOptions) => {
  // TODO change network to mainnet and start to "2026-05-05"
  const res: any = await httpGet(`${FEES_URL}?start_date=${options.dateString}&end_date=${options.dateString}&network=testnet`);
  const day = res.days?.find((d: any) => d.date === options.dateString);
  if (!day) throw new Error("No data found for the given date: " + options.dateString);

  const dailyFees = options.createBalances();
  dailyFees.addUSDValue(day.exchange_fees_usd);

  return {
    dailyFees,
    dailyRevenue: dailyFees,
  };
};

const adapter: SimpleAdapter = {
  version: 2,
  fetch,
  // mainnet "2026-05-05"
  start: "2026-04-20",
  chains: [CHAIN.INJECTIVE],
  methodology: {
    Fees: "Exchange fees collected from TrueCurrent derivative trades, sourced from BigQuery.",
    Revenue: "100% of exchange fees accrue to the protocol.",
  },
};

export default adapter;
