import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    boxSizing: 'border-box',
    height: '100%',
    overflowY: 'scroll',
    padding: 20,
  },
};

const Container = ({ children, classes }) => <div className={classes.container}>{children}</div>;

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Container);
