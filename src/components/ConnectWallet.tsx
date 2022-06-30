import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { useState, useEffect } from "react";

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const ConnectWallet = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  // const { disconnect } = useDisconnect();

  const isMounted = useIsMounted();
  return (
    <div className="container mx-auto px-4 bg-center">
      {/* // ToDo: How to do it safely typescript */}
      {/* {ٍ<button onClick={disconnect}>Disconnect</button> } */}
      <div className="flex justify-center">
        <div className="block p-0 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">
            Liquidus
          </h5>
          <p className="text-gray-700 text-base mb-4">
            <span className="text-xl"> Liquidus </span> is a Liquidity
            Bootstrapping Pool, it:
            <br />
            - supports the DAI stablecoin as a bootstrapping token.
            <br />- operates only on Kovan, for now.
          </p>
          {isConnected && (
            <div className="text-center space-y-2 sm:text-left">
              {ensName ? `${ensName} (${address})` : address}
            </div>
          )}

          {!isConnected && (
            <div>
              {connectors.map((connector) => (
                <button
                  type="button"
                  className="px-2 py-2 bg-blue-600 text-white font-medium text-xs  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                >
                  {isMounted
                    ? connector.name
                    : connector.id === "injected"
                    ? connector.id
                    : connector.name}
                  {!connector.ready && " (unsupported)"}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </button>
              ))}

              {error && <div>{error?.message}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
