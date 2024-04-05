import { useNavigate } from 'react-router-dom';

import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();

  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }

    const userData = { address: address, chain: 1 };
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `${import.meta.env.REACT_APP_SERVER_URL}/nonce`,
      userData,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios.post(
      `${import.meta.env.REACT_APP_SERVER_URL}/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true }, // set cookie from Express server
    );

    // redirect to /user
    navigate('/user');
  };

  return (
    <div>
      <h3 color="red">Web3 Authentication</h3>
      <button onClick={() => handleAuth()}>Authenticate via MetaMask</button>
    </div>
  );
}
