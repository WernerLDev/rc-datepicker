'use strict';

import React from 'react';
import moment from 'moment';
import InvalidDate from '../InvalidDate.jsx';
import Picker from '../Picker.jsx';
import Row from '../Row.jsx';
import DateUtils from '../utils/DateUtils';

const YearPickerBody = React.createClass({

    propTypes: {
      visibleDate:  React.PropTypes.any.isRequired,
      date:         React.PropTypes.any,
      onSelectDate: React.PropTypes.func.isRequired,
      mode:         React.PropTypes.string.isRequired,
      className:    React.PropTypes.string.isRequired
    },

    render() {
      if (!this.props.visibleDate.isValid()) {
        return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
      }
      const year = this.props.visibleDate.year();
      const selectedYear = this.props.date ? this.props.date.year() : -1;

      const visibleYears = DateUtils.getVisibleYears(year);
      const years = visibleYears.years.map((_year, index) => {
        const isCurrent = index >= visibleYears.startCurrent && index <= visibleYears.endCurrent;
        return <Picker
          date={moment([_year, 0, 1])}
          isSelected={selectedYear === _year}
          isCurrent={isCurrent}
          onSelectDate={this.props.onSelectDate}
          mode={this.props.mode}
          key={index}
        />;
      });
      const nColumns = 4;
      const nRows = 3;
      const rows = Array.apply(null, Array(nRows)).map((n, index) =>
        <Row pickers={years.slice(nColumns * index, nColumns * (index + 1))} mode={this.props.mode} key={index} />);

      return (
        <div className='body'>
          {rows}
        </div>
      );
    }
});

export default YearPickerBody;
