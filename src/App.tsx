import React from 'react';
import './App.css';
import { Types, AptosClient } from 'aptos';

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

function App() {
  // Retrieve aptos.account on initial render and store it.
  const [address, setAddress] = React.useState<string | null>(null);
  const [account, setAccount] = React.useState<Types.AccountData | null>(null);
  React.useEffect(() => {
    // 获取钱包授权
    window.aptos!.connect()
    window.aptos.account().then(
      (data: { address: string }) => {
        //判断是否获取到钱包授权
        if (data.address === "") {
          setAddress("nil")
        } else {
          setAddress(data.address)
        }
      });
    if (!address) return;
    client.getAccount(address).then(setAccount);
  }, [address]);

  return (
    <div className="App">
      <p><code>{address}</code></p>
      {/* 现在，除了显示账户地址外，应用程序还会显示账户的sequence_number. 
      这sequence_number表示下一个交易序列号，以防止交易重放攻击。当您使用该帐户进行交易时，您会看到这个数字在增加。 */}
      <p><code>{account?.sequence_number}</code></p>
    </div>
  );
}

export default App;