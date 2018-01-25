import React, { Component } from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import Divider from "material-ui/Divider";

export default class CryptoRow extends Component {
  render() {
    const { cardtext } = this.props;
    return (
      <div>
        <Card>
          <CardText> {cardtext}</CardText>

          <Divider />
        </Card>
      </div>
    );
  }
}
