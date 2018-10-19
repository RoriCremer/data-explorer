import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import colors from "libs/colors"
import * as Style from "libs/style"

const styles = {
  facetCard: {
    ...Style.elements.card,
    display: 'grid',
    gridTemplateColumns: 'auto 100px',
    gridTemplateRows: 'auto',
  },
  facetName: {
color: 'red',
    gridColumn: 1 / 2,
    gridRow: 1 / 2,
  },
  facetTotalCount: {
color: 'orange',
    gridColumn: 2 / 3,
    gridRow: 1 / 2,
  },
}

const themeStyles = theme => ({
  root: {
    // Disable gray background on ListItem hover. It's not possible to inline
    // hover CSS
    // (https://stackoverflow.com/questions/1033156/how-to-write-ahover-in-inline-css)
    // so we have to do it this way.
    '&:hover': {
      backgroundColor: 'unset',
    },
  }
});

class FacetCard extends Component {
  constructor(props) {
    super(props);

    this.facetValues = this.props.facet.values;

    this.state = {
      // List of strings, eg ["female"]
      selectedValues: []
    };

    this.totalFacetValueCount = this.sumFacetValueCounts(
      this.props.facet.values,
      []
    );

    this.onClick = this.onClick.bind(this);
    this.isDimmed = this.isDimmed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.totalFacetValueCount = this.sumFacetValueCounts(
      nextProps.facet.values,
      this.state.selectedValues
    );
  }

  render() {
    const { classes } = this.props;

    // facetValue is a dict, eg { name: "female", count: 1760 }
    const facetValues = this.props.facet.values.map(facetValue => (
      <ListItem
        classes={{ root: classes.root }}
        key={facetValue.name}
        button
        disableRipple
        onClick={(e) => this.onClick(facetValue.name)}
      >
        <Checkbox
          checked={this.state.selectedValues.includes(facetValue.name)}
        />
        <ListItemText primary={
          <div style={this.isDimmed(facetValue) ? { color: colors.gray[3] } : {}}>
            <div>{facetValue.name}</div>
            <div>{facetValue.count}</div>
          </div>
        } />
      </ListItem>
    ));
    const totalFacetValueCount = (
      <Typography>
        {this.totalFacetValueCount}
      </Typography>
    );

    return (
      <div style={ styles.facetCard } >
        <div>
          <Typography style={ styles.facetName } >
            {this.props.facet.name}
          </Typography>
          { this.props.facet.name != "Samples Overview"
            ? <Typography style={{ color: 'red' }} >
                {totalFacetValueCount}
              </Typography>
            : null
          }
        </div>
        <Typography>
          {this.props.facet.description}
        </Typography>
        <List dense>{facetValues}</List>
      </div>
    );
  }

  isDimmed(facetValue) {
    return (
      this.state.selectedValues.length > 0 &&
      !(this.state.selectedValues.includes(facetValue.name))
    );
  }

  /**
   * @param facetValues FacetValue[] to sum counts over
   * @param selectedValueNames Optional string[] to select a subset of facetValues to sum counts for
   * @return number count the total sum of all facetValue counts, optionally filtered by selectedValueNames
   * */
  sumFacetValueCounts(facetValues, selectedValueNames) {
    let count = 0;
    if (selectedValueNames.length === 0) {
      facetValues.forEach(value => {
        count += value.count;
      });
    } else {
      facetValues.forEach(value => {
        if (selectedValueNames.indexOf(value.name) > -1) {
          count += value.count;
        }
      });
    }

    return count;
  }

  onClick(facetValue) {
    // facetValue is a string, eg "female"
    let newValues = this.state.selectedValues.slice(0);
    let isSelected;
    if (this.state.selectedValues.includes(facetValue)) {
      // User must have unchecked the checkbox.
      isSelected = false;
      newValues.splice(newValues.indexOf(facetValue.name), 1);
    } else {
      // User must have unchecked the checkbox.
      isSelected = true;
      newValues.push(facetValue);
    }
    this.setState({ selectedValues: newValues });
    this.props.updateFacets(this.props.facet.es_field_name, facetValue, isSelected);
  }
}

export default withStyles(themeStyles)(FacetCard);
