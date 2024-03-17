"use client";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

interface IWorldCoinProps {
  onSuccess: (data: unknown) => void;
  handleVerify: (data: unknown) => void;
}

export default function WorldCoin(
  { onSuccess, handleVerify }: IWorldCoinProps,
) {
  return (
    <IDKitWidget
      app_id={process.env["NEXT_PUBLIC_WORLDCOIN_APP_ID"]! as `app_${string}`}
      action="hackathon-action"
      autoClose={false}
      verification_level={VerificationLevel.Device}
      handleVerify={handleVerify}
      onSuccess={onSuccess}
    >
      {({ open }) => (
        <button
          onClick={(evt) => {
            evt.preventDefault();
            open();
          }}
          className="inline-flex items-center rounded-md bg-black px-3 py-2 font-semibold text-white hover:bg-gray-700"
        >
          Verify with World ID
        </button>
      )}
    </IDKitWidget>
  );
}
