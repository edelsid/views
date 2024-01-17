import { useState } from 'react';
import './App.css';

const WithFormat = (Component) => {
  return function Enhanced (props) {
    const current = Date.parse('2018-03-03 13:09:00');
    const fromFile = Date.parse(props.date);
    const hours = Math.abs(current - fromFile) / 36e5; 
    
    let result;
    if (hours > 24) result = 'X дней назад';
    else if (hours < 1) result = '12 минут назад';
    else result = '5 часов назад';

    return (
      <Component {...props} date={result} />
    );
  }
}

const DateTimePretty = WithFormat(DateTime);

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.props.map(item => <Video key={item.date} url={item.url} date={item.date} />);
}

export default function App() {
  const [list] = useState([{
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
  },
  {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
  },
  {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
  },
  {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
  },
  {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
  },
  {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
  },
    ]);

    return (
        <VideoList props={list} />
    );
}
