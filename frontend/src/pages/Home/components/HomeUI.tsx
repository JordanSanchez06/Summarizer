import React, { useState } from 'react';


function HomeUI() {
    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId: string = ud.id;
    let fullName: string = ud.fullName;
    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [cardList, setCardList] = useState('');
    const [search, setSearchValue] = React.useState('');
    const [card, setCardNameValue] = React.useState('');
    async function addCard(e: any): Promise<void> {
        e.preventDefault();
        let obj = { userId: userId, card: card };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/addcard',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('Card has been added');
            }
        }
        catch (error: any) {
            setMessage(error.toString());
        }
    };
    async function searchCard(e: any): Promise<void> {
        e.preventDefault();
        let obj = { userId: userId, search: search };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchcards',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for (let i = 0; i < _results.length; i++) {
                resultText += _results[i];
                if (i < _results.length - 1) {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
        catch (error: any) {
            alert(error.toString());
            setResults(error.toString());
        }
    };
    function handleSearchTextChange(e: any): void {
        setSearchValue(e.target.value);
    }
    function handleCardTextChange(e: any): void {
        setCardNameValue(e.target.value);
    }
    return (
    <body>
        <div className="side-bar">
            <div className="side-bar-header">Website Name</div>
            <div className="divider"></div>
            <a href="homepage.html" className="side-bar-links" id="first-link" target="_self">Home</a>
            <a href="homepage.html" className="side-bar-links" target="_self">Upload</a>
            <a href="homepage.html" className="side-bar-links" target="_self">My Acccount</a>
            <a href="homepage.html" className="side-bar-logout" target="_self">Log out</a>
        </div>
        <div className="right-container">
            <h1 className="container-heading">Home Page</h1>
            <p>Welcome back, User!</p>
        </div>
    </body>
    );
}

export default HomeUI;