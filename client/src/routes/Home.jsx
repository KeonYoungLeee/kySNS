import React, { useState, useCallback, useEffect } from 'react';
import { dbService } from './../fbase';

const Home = () => {

  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNwetts = async() => {
    const dbNweets = await dbService.collection('nweets').get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id
      }
      setNweets((prev) => [nweetObject, ...prev]);
    });
  }

  useEffect(() => {
    getNwetts();
  }, [])

  const onSubmitForm = useCallback(async(event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet('');
  }, [nweet]);
  
  const onChangeNweet = useCallback((event) => {
    const { target: { value } } = event;
    setNweet(value);
  }, [])


  return (
    <div>
      <form onSubmit={onSubmitForm} >
        <input 
          type="text"
          placeholder="Whats's on your mind"
          maxLength={120}
          value={nweet}
          onChange={onChangeNweet}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => 
          <div key={nweet.id} >
            <h4>{nweet.nweet}</h4>
          </div>  
        )}
      </div>
    </div>
  );
};

export default Home;
