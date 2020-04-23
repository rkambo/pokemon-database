import React from 'react';

class PostRequestAsyncAwait extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    async componentDidMount() {
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'car' })
        };
        const response = await fetch('http://localhost:3001/searchPokemon', requestOptions);
        const data = await response.json();
        console.log(data.results[0].name)
        this.setState({ name: data.results[0].name });
    }

    render() {
        //const { postId } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">POST Request with Async/Await</h5>
                <div className="card-body">
                    Returned Id: {this.state.name};
                </div>
            </div>
        );
    }
}

export { PostRequestAsyncAwait }; 