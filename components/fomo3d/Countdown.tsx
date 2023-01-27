import React from "react";
import Countdown from "react-countdown";

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  return (
    <div className="font-serif text-3xl font-extrabold">
      {completed ? (
        <span className="text-5xl">Game has ended!</span>
      ) : (
        <div className="grid grid-cols-5 px-12 md:px-36">
          <div className="flex flex-col">
            <div className="mb-2 text-7xl">{hours}</div>
            <span className="text-sm">Hours</span>
          </div>
          <span className="mt-6">:</span>
          <div className="flex flex-col">
            <div className="mb-2 text-7xl">{minutes}</div>
            <span className="text-sm">Minutes</span>
          </div>
          <span className="mt-6">:</span>
          <div className="flex flex-col">
            <div className="mb-2 text-7xl">{seconds}</div>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface CountdownProps {
  expiry: moment.Moment;
}

export default function CountdownTimer({ expiry }: CountdownProps) {
  return (
    <div className="mx-auto mb-8 text-center">
      <Countdown date={expiry.toDate()} renderer={renderer} />
    </div>
  );
}
