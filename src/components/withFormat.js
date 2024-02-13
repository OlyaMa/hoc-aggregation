import React from "react";
import moment from "moment";

export default function withFormat(Component, groupBy = false, formatType) {
  return class extends React.Component {
    static get displayName() {
      const name = Component.displayName ||
        Component.name || 'Component';
      return `WithFormat(${name})`;
    }

    group(data) {
      const groupedData = data.reduce((acc, data) => {
        const index = acc.findIndex((item) => item[groupBy].get(groupBy) === data.date.get(groupBy));
        if (index === -1) {
          acc.push({ [groupBy]: data.date, amount: data.amount })
        } else {
          acc[index].amount += data.amount;
        }
        return acc;
      }, []);
      return groupedData;
    }

    format(data) {
      const keyFormat = groupBy || 'date';
      const formattedData = data.map((item) => ({ ...item, [keyFormat]: item[keyFormat].format(formatType) }));
      return formattedData;
    }

    sort(data) {
      if (!groupBy) {
        return data.sort((a, b) => b.date.diff(a.date));
      }
      return data.sort((a, b) => b[groupBy].get(groupBy) - a[groupBy].get(groupBy));
    }

    render() {
      const momentData = this.props.list.map((item) => ({ ...item, date: moment(item.date) }));
      let groupedData = momentData;
      if (groupBy) {
        groupedData = this.group(momentData);
      }
      const sortedData = this.sort(groupedData);
      const formattedData = this.format(sortedData);
      return <Component {...this.props} list={formattedData} />
    }
  }
}