import './App.css';
import React from 'react';
import MonthTable from './components/MonthTable';
import YearTable from './components/YearTable';
import SortTable from './components/SortTable';
import withFormat from './components/withFormat';

const MonthTableWithFormat = withFormat(MonthTable, 'month', 'MMM');
const YearTableWithFormat = withFormat(YearTable, 'year', 'YYYY');
const SortTableWithFormat = withFormat(SortTable, false, 'YYYY-MM-DD');

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    fetch(process.env.REACT_APP_DATA_URL)
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <MonthTableWithFormat list={list} />
        <YearTableWithFormat list={list} />
        <SortTableWithFormat list={list} />
      </div>
    );
  }
}
