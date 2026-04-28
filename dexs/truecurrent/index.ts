import { httpGet } from "../../utils/fetchURL";
import { FetchOptions, SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

const DERIVATIVE_URL = `https://bigquery-api-636134865280.europe-west1.run.app/truecurrent_derivative_volume`;

const fetch = async (options: FetchOptions) => {
  // TODO change network to mainnet and start to "2026-05-05"
  const res: any = await httpGet(`${DERIVATIVE_URL}?start_date=${options.dateString}&end_date=${options.dateString}&network=testnet`);
  const day = res.days?.find((d: any) => d.date === options.dateString);
  if (!day) throw new Error("No data found for the given date: " + options.dateString);

  return {
    dailyVolume: day.volume_usd,
  };
};

const adapter: SimpleAdapter = {
  version: 2,
  fetch,
  // mainnet "2026-05-05"
  start: "2026-04-20",
  chains: [CHAIN.INJECTIVE],
  methodology: {
    Volume: "Sum of taker-side notional (USDC-denominated) across all TrueCurrent derivative trades for the day, sourced from BigQuery.",
  },
};

export default adapter;
