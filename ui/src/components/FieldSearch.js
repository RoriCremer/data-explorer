import React from "react";
import Select, { components } from "react-select";

class FieldSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Select
        isMulti="true"
        onChange={this.props.handleChange}
        options={this.props.fields}
        value={this.props.chips}
      />
    );
  }
}

export default FieldSearch;
