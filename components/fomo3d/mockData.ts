import { IGameState } from "./index";
import moment from "moment";

export const mockFinishedData: IGameState = {
  currentBid: "0.0101",
  expiry: moment().subtract(1, "days"),
  currentBidder: "0x5f10dd7439BF440C86EFF01097Dce36B27B1001d",
  nextBidMinimum: "0.010201",
  timeHasExpired: true,
  winnerHasClaimed: true,
};

export const mockFinishedUnclaimedData: IGameState = {
  currentBid: "0.0101",
  expiry: moment().subtract(1, "days"),
  currentBidder: "0x5f10dd7439BF440C86EFF01097Dce36B27B1001d",
  nextBidMinimum: "0.010201",
  timeHasExpired: true,
  winnerHasClaimed: false,
};

export const mockUnfinishedData: IGameState = {
  currentBid: "0.010000",
  expiry: moment().add(1, "days"),
  currentBidder: "0x5f10dd7439BF440C86EFF01097Dce36B27B1001d",
  nextBidMinimum: "0.0101",
  timeHasExpired: false,
  winnerHasClaimed: false,
};
