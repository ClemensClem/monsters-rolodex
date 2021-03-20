import { React, Component } from "react";

import { CardList } from "./components/card-list/card-list.component.jsx";
import { SearchBox } from "./components/search-box/search-box.component.jsx";

import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            monsters: [
                { name: "Frankenstein", id: "12" },
                { name: "Dracula", id: "13" },
                { name: "Zombie", id: "14" },
            ],
            searchField: "",
        };
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((res) => res.json())
            .then((newMonsters) => {
                this.setState({
                    monsters: [...this.state.monsters, ...newMonsters],
                });
            });
    }

    handleChange = (e) => {
        this.setState({ searchField: e.target.value });
    };

    render() {
        const { monsters, searchField } = this.state;

        const filteredMonsters = monsters.filter((monster) =>
            monster.name.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className="App">
                <h1>Monsters Rodolex</h1>
                <SearchBox
                    placeholder="search monsters"
                    handleChange={this.handleChange}
                />
                <CardList monsters={filteredMonsters} />
            </div>
        );
    }
}

export default App;
