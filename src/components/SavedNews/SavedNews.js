import { useState, useEffect } from 'react';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';


function SavedNews({ logout, openLoginPopup }) {

  // temporary sample cards for testing
  const [cards, setCards] = useState([]);
  const [newsError, setNewsError] = useState(false);


  useEffect(() => {
    // just set some sample cards for now, will switch to retrieve from API later
    setCards([
      {
        "source": {
            "id": "bbc-news",
            "name": "BBC News"
        },
        "keyword": "nature",
        "author": null,
        "title": "Earth Hour: Cities around the world turn lights off",
        "description": "Famous landmarks around the world have been switching off their lights to raise awareness of environmental issues.",
        "url": "https://www.bbc.co.uk/news/av/world-56553545",
        "urlToImage": "https://ichef.bbci.co.uk/images/ic/400xn/p09c1nx3.jpg",
        "publishedAt": "2021-03-28T02:33:37Z",
        "content": "Famous landmarks in cities such as Paris, Moscow, Athens, Rome, Berlin and Rio de Janeiro have turned off their lights to raise awareness of environmental issues.\r\nEarth Hour is an annual global even… [+170 chars]"
      },

      {
        "source": {
            "id": "mashable",
            "name": "Mashable"
        },
        "keyword": "nature",
        "author": "Mark Kaufman",
        "title": "You can watch Iceland's new, thrilling eruption live",
        "description": "Fresh new earth is pouring from the ground in Iceland. \nAnd you can watch this lava splattering and flowing live on YouTube.\nIcelandic scientists put up a webcam on Saturday near a newly opened fissure on the Reykjanes Peninsula, located on the southwestern p…",
        "url": "https://mashable.com/article/iceland-volcano-eruption-livestream-watch/",
        "urlToImage": "https://mondrian.mashable.com/2021%252F03%252F23%252F54%252Fc086c305c2494fbb9441dca333ae249f.75610.jpg%252F1200x630.jpg?signature=i-qHzZSVSjiQiokrTn51eDCgeBM=",
        "publishedAt": "2021-03-23T17:00:09Z",
        "content": "Fresh new earth is pouring from the ground in Iceland. \r\nAnd you can watch this lava splattering and flowing live on YouTube.\r\nIcelandic scientists put up a webcam on Saturday near a newly opened fis… [+1511 chars]"
      },
      {
        "source": {
            "id": null,
            "name": "Yahoo Entertainment"
        },
        "keyword": "Yellowstone",
        "author": "Maddie Capron",
        "title": "Ever seen a ‘snow snail?’ Odd formation in Yellowstone caused by weather phenomenon",
        "description": "The formation is nearly impossible to replicate, weather experts said.",
        "url": "https://news.yahoo.com/ever-seen-snow-snail-odd-165541763.html",
        "urlToImage": "https://s.yimg.com/uu/api/res/1.2/_Vzk5ydVqM9NWscOjKajgQ--~B/aD03NjA7dz0xMTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/the_state_mcclatchy_264/60d4cf156a468e96f80197e6cd7c4dc3",
        "publishedAt": "2021-04-06T16:55:41Z",
        "content": "An incredibly rare weather phenomenon created mysterious snow formations in Yellowstone National Park.\r\nPark officials posted a photo to social media Tuesday that shows multiple snowballs lined up at… [+1571 chars]"
      },
      {
        "source": {
            "id": null,
            "name": "Lifehacker.com"
        },
        "keyword": "travel",
        "author": "Beth Skwarecki on Vitals, shared by Beth Skwarecki to Lifehacker",
        "title": "Is It Safe to Travel Yet?",
        "description": "Vaccines are becoming more available and coronavirus cases are dropping nationwide. If you stayed home all winter, you might be wondering if it’s finally okay to take a vacation somewhere. The short answer is: not really. The long answer? Let’s dive in. Read …",
        "url": "https://vitals.lifehacker.com/is-it-safe-to-travel-yet-1846488590",
        "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/pbfxlv0o3ugrjsue7lgt.jpg",
        "publishedAt": "2021-03-16T20:00:00Z",
        "content": "Vaccines are becoming more available and coronavirus cases are dropping nationwide. If you stayed home all winter, you might be wondering if its finally okay to take a vacation somewhere. The short a… [+4366 chars]"
      },
      {
        "source": {
            "id": "the-verge",
            "name": "The Verge"
        },
        "keyword": "pandemic",
        "author": "Mary Beth Griggs",
        "title": "We’re on the knife’s edge of the pandemic",
        "description": "In the US, great joy co-exists with deep worries about the current state of the COVID-19 pandemic, as vaccinations increase, and case counts rise.",
        "url": "https://www.theverge.com/2021/4/3/22364637/pandemic-edge-fear-hope-vaccines-surge-antivirus-newsletter",
        "urlToImage": "https://cdn.vox-cdn.com/thumbor/MnxxYSNK68UfpBoeAai-rBPZN2I=/0x434:6063x3608/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22417342/1232071704.jpg",
        "publishedAt": "2021-04-03T14:00:00Z",
        "content": "Antivirus: a weekly digest of COVID-19 research and development\r\nA vaccine site that opened in Louisville, Kentucky on April 2, 2021, as cases rose in the state.\r\nPhoto by Jon Cherry/Getty Images\r\nTh… [+5496 chars]"
      }
    ]);
  }, []);
  

  return (
    <>
      <SavedNewsHeader 
        cardCount={cards.length} 
        logout={logout} 
        openLoginPopup={openLoginPopup} 
        newsError={newsError}
      />
      
      { cards.length ? <NewsCardList cards={cards} /> : null }

      <Footer />
    </>
  );
}

export default SavedNews;